#  Copyright 2021 Collate
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#  http://www.apache.org/licenses/LICENSE-2.0
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.

"""
ColumnValuesToBeBetween validation implementation
"""
# pylint: disable=duplicate-code

from datetime import datetime

from sqlalchemy import inspect

from metadata.generated.schema.tests.basic import (
    TestCaseResult,
    TestCaseStatus,
    TestResultValue,
)
from metadata.generated.schema.tests.testCase import TestCase
from metadata.orm_profiler.metrics.registry import Metrics
from metadata.orm_profiler.profiler.runner import QueryRunner
from metadata.utils.logger import test_suite_logger

logger = test_suite_logger()


def column_value_median_to_be_between(
    test_case: TestCase,
    execution_date: datetime,
    runner: QueryRunner,
) -> TestCaseResult:
    """
    Validate Column Values metric
    :param test_case: ColumnValuesToBeBetween
    :param col_profile: should contain MIN & MAX metrics
    :param execution_date: Datetime when the tests ran
    :return: TestCaseResult with status and results
    """

    try:
        column_name = test_case.entityLink.__root__.split("::")[-1].replace(">", "")
        col = next(
            (col for col in inspect(runner.table).c if col.name == column_name),
            None,
        )
        if col is None:
            raise ValueError(
                f"Cannot find the configured column {column_name} for test case {test_case.name}"
            )

        median_value_dict = dict(
            runner.dispatch_query_select_first(Metrics.MEDIAN.value(col).fn())
        )
        median_value_res = median_value_dict.get(Metrics.MEDIAN.name)

    except Exception as err:
        msg = (
            f"Error computing {test_case.name} for {runner.table.__tablename__} - {err}"
        )
        logger.error(msg)
        return TestCaseResult(
            timestamp=execution_date,
            testCaseStatus=TestCaseStatus.Aborted,
            result=msg,
            testResultValue=[TestResultValue(name="median", value=None)],
        )

    min_bound = next(
        (
            float(param.value)
            for param in test_case.parameterValues
            if param.name == "minValueForMedianInCol"
        )
    )
    max_bound = next(
        (
            float(param.value)
            for param in test_case.parameterValues
            if param.name == "maxValueForMedianInCol"
        )
    )

    status = (
        TestCaseStatus.Success
        if min_bound <= median_value_res <= max_bound
        else TestCaseStatus.Failed
    )
    result = (
        f"Found median={median_value_res} vs."
        + f" the expected median={min_bound}, max={max_bound}."
    )

    return TestCaseResult(
        timestamp=execution_date,
        testCaseStatus=status,
        result=result,
        testResultValue=[TestResultValue(name="median", value=str(median_value_res))],
    )