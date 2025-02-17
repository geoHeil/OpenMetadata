/*
 *  Copyright 2022 Collate
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { ReactNode } from 'react';
import { Chart, ChartType } from '../../../../generated/entity/data/chart';
import {
  FeatureType,
  MlFeature,
} from '../../../../generated/entity/data/mlmodel';
import { Task } from '../../../../generated/entity/data/pipeline';
import {
  Column,
  Constraint,
  DataType,
} from '../../../../generated/entity/data/table';
import { TagLabel } from '../../../../generated/type/tagLabel';

export interface SummaryListProps {
  columns?: Column[];
  charts?: Chart[];
  tasks?: Task[];
  mlFeatures?: MlFeature[];
}

export interface BasicColumnInfo {
  algorithm?: string;
  name: string;
  title: ReactNode;
  type?: DataType | ChartType | FeatureType | string;
  tags?: TagLabel[];
  description?: string;
  constraint?: Constraint;
}
