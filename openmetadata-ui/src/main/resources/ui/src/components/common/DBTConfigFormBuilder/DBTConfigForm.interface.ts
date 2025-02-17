/*
 *  Copyright 2021 Collate
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

import { FormSubmitType } from '../../../enums/form.enum';
import {
  DbtConfig,
  GCSCredentialsValues,
  SCredentials,
} from '../../../generated/metadataIngestion/dbtPipeline';
import { DBT_SOURCES, GCS_CONFIG } from './DBTFormEnum';

export interface DBTFormCommonProps {
  okText: string;
  cancelText: string;
  onCancel: () => void;
  onSubmit: (data?: DbtConfig) => void;
}

export interface DBTConfigFormProps extends DBTFormCommonProps {
  formType: FormSubmitType;
  data: DbtConfig;
  gcsType?: GCS_CONFIG;
  source?: DBT_SOURCES;
  handleGcsTypeChange?: (type: GCS_CONFIG) => void;
  handleSourceChange?: (src: DBT_SOURCES) => void;
  ingestionName: string;
  handleIngestionName: (value: string) => void;
}

export type DbtConfigCloud = Pick<
  DbtConfig,
  | 'dbtCloudAccountId'
  | 'dbtCloudAuthToken'
  | 'dbtUpdateDescriptions'
  | 'dbtCloudProjectId'
>;

export type DbtConfigLocal = Pick<
  DbtConfig,
  | 'dbtCatalogFilePath'
  | 'dbtManifestFilePath'
  | 'dbtRunResultsFilePath'
  | 'dbtUpdateDescriptions'
>;

export type DbtConfigHttp = Pick<
  DbtConfig,
  | 'dbtCatalogHttpPath'
  | 'dbtManifestHttpPath'
  | 'dbtRunResultsHttpPath'
  | 'dbtUpdateDescriptions'
>;

export type DbtConfigS3GCS = Pick<
  DbtConfig,
  'dbtSecurityConfig' | 'dbtPrefixConfig' | 'dbtUpdateDescriptions'
>;

export type DbtS3Creds = Pick<
  SCredentials,
  | 'awsAccessKeyId'
  | 'awsRegion'
  | 'awsSecretAccessKey'
  | 'awsSessionToken'
  | 'endPointURL'
>;

export type DbtS3CredsReq = Pick<DbtS3Creds, 'awsRegion'>;

export type DbtConfigCloudReq = Pick<
  DbtConfigCloud,
  'dbtCloudAccountId' | 'dbtCloudAuthToken'
>;

export interface DbtSourceTypes {
  sourceType: DBT_SOURCES;
  gcsType?: GCS_CONFIG;
}

export type DbtGCSCreds = GCSCredentialsValues;

export type ErrorDbtCloud = Record<keyof DbtConfigCloud, string>;

export type ErrorDbtLocal = Record<keyof DbtConfigLocal, string>;

export type ErrorDbtHttp = Record<keyof DbtConfigHttp, string>;

export type ErrorDbtS3 = Record<keyof DbtS3Creds, string>;

export type ErrorDbtGCS = { gcsConfig: string } & Record<
  keyof DbtGCSCreds,
  string
>;
