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

import React from 'react';
import Lottie from 'react-lottie';

import cn from "classnames";

import animationData from './data.json';
import './styles.scss'

export interface CirclePreloaderProps {
    position: "relative" | "absolute";
}

export function CirclePreloader(props: CirclePreloaderProps) {
    const { position } = props;

    const loaderPosition = (position === "relative") ?  cn("preloader-circle-relative") : cn("preloader-circle-absolute");

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className={loaderPosition}>
            <Lottie options={defaultOptions} height={`32px`} width={`32px`} />
        </div>
    );
}