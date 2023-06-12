/**
 * Copyright (c) 2023, WSO2 LLC. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */

import { DefaultConfig } from "../Visitors/default";

export class SimpleBBox {
    public x: number = 0;
    public y: number = 0;
    public r: number = 0;
    public w: number = 0;
    public rw: number = 0;
    public lw: number = 0;
    public h: number = 0;
    public rx: number = 0;
    public ry: number = 0;
    public cx: number = 0;
    public cy: number = 0;
    public length: number = 0;
    public label: string = "";
    public labelWidth: number = 0;
    public offsetFromBottom: number = DefaultConfig.offSet;
    public offsetFromTop: number = DefaultConfig.offSet;

    public x1: number = 0;
    public x2: number = 0;
    public y1: number = 0;
    public y2: number = 0;
}