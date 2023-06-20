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

import React from "react";
import { Circle } from "@wso2-ei/low-code-diagram";
import { getComponent } from "../../util";
import { WorkerLine } from "../worker-line";

interface SquareProps {
  model: Circle;
}

export function Oauth(props: SquareProps) {
  const { model } = props;

  const viewState = model.viewState;
  const components: JSX.Element[] = [];

  model.children.forEach((child) => {
    components.push(getComponent(child.type, { model: child }));
  });

  return (
    <>
      <svg
        x={viewState.bBox.x}
        y={viewState.bBox.y}
        width={viewState.bBox.r * 2}
        height={viewState.bBox.r * 2}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="286" cy="277.5" rx="227" ry="235.5" fill="white" />
        <path
          d="M303.008 0C294.987 0 286.717 0.250152 278.195 0.750456C261.654 1.75106 244.11 4.50274 225.564 9.00547C208.02 13.5082 192.982 18.5112 180.451 24.0146C161.404 32.5198 142.105 43.5264 122.556 57.0347C100.501 72.5441 80.9524 91.3055 63.9098 113.319C46.8672 135.332 33.0827 159.347 22.5564 185.363L18.797 194.368C14.2857 205.375 11.2782 213.63 9.77444 219.133C3.25815 241.647 0 266.162 0 292.678C0 317.193 2.25564 340.457 6.76692 362.47C17.7945 412.501 38.3459 455.277 68.4211 490.798C94.4862 521.817 129.323 548.833 172.932 571.847C196.992 584.355 224.436 592.735 255.263 596.988C286.09 601.24 317.293 600.99 348.872 596.237C380.451 591.484 409.273 582.604 435.338 569.596C480.451 546.582 518.546 511.811 549.624 465.283C565.163 442.269 577.193 417.254 585.714 390.237C595.238 360.219 600 329.2 600 297.181C600 268.663 594.737 238.895 584.211 207.876C575.689 181.86 564.16 157.596 549.624 135.082C524.06 94.5575 491.98 62.7881 453.383 39.7742C409.273 13.2581 359.148 0 303.008 0ZM277.444 142.587H318.045C326.065 142.587 333.333 144.963 339.85 149.716C346.366 154.469 350.877 160.598 353.383 168.102L433.083 408.248C436.591 418.254 435.965 427.885 431.203 437.141C426.441 446.396 419.298 452.525 409.774 455.527C405.764 456.527 401.754 457.028 397.744 457.028C389.724 457.028 382.456 454.776 375.94 450.274C369.424 445.771 364.912 439.517 362.406 431.512L345.113 376.729H254.887L237.594 431.512C235.088 439.017 230.576 445.145 224.06 449.898C217.544 454.651 210.276 457.028 202.256 457.028C198.246 457.028 194.486 456.527 190.977 455.527C180.952 452.525 173.559 446.521 168.797 437.516C164.035 428.51 163.158 419.005 166.165 408.999L242.105 168.853C244.612 160.848 249.123 154.469 255.639 149.716C262.155 144.963 269.424 142.587 277.444 142.587Z"
          fill="#AD5656"
        />
        <path
          d="M250.273 537.426C248.066 537.426 246.158 536.957 244.548 536.02C242.948 535.073 241.712 533.757 240.841 532.071C239.97 530.376 239.534 528.411 239.534 526.176C239.534 523.922 239.97 521.953 240.841 520.267C241.712 518.572 242.948 517.256 244.548 516.318C246.158 515.371 248.066 514.898 250.273 514.898C252.479 514.898 254.383 515.371 255.983 516.318C257.593 517.256 258.833 518.572 259.705 520.267C260.576 521.953 261.011 523.922 261.011 526.176C261.011 528.411 260.576 530.376 259.705 532.071C258.833 533.757 257.593 535.073 255.983 536.02C254.383 536.957 252.479 537.426 250.273 537.426ZM250.301 532.739C251.305 532.739 252.143 532.455 252.815 531.886C253.488 531.309 253.994 530.523 254.335 529.528C254.686 528.534 254.861 527.402 254.861 526.134C254.861 524.865 254.686 523.733 254.335 522.739C253.994 521.744 253.488 520.958 252.815 520.381C252.143 519.803 251.305 519.514 250.301 519.514C249.288 519.514 248.436 519.803 247.744 520.381C247.063 520.958 246.546 521.744 246.196 522.739C245.855 523.733 245.685 524.865 245.685 526.134C245.685 527.402 245.855 528.534 246.196 529.528C246.546 530.523 247.063 531.309 247.744 531.886C248.436 532.455 249.288 532.739 250.301 532.739ZM268.707 537H262.116L272.158 507.909H280.085L290.113 537H283.522L276.235 514.557H276.008L268.707 537ZM268.295 525.565H283.863V530.366H268.295V525.565ZM307.492 527.71V515.182H313.543V537H307.734V533.037H307.506C307.014 534.315 306.195 535.343 305.049 536.119C303.913 536.896 302.525 537.284 300.887 537.284C299.429 537.284 298.146 536.953 297.038 536.29C295.93 535.627 295.063 534.685 294.438 533.463C293.823 532.241 293.51 530.778 293.501 529.074V515.182H299.552V527.994C299.561 529.282 299.907 530.3 300.589 531.048C301.271 531.796 302.184 532.17 303.33 532.17C304.059 532.17 304.741 532.005 305.376 531.673C306.01 531.332 306.522 530.83 306.91 530.168C307.308 529.505 307.502 528.686 307.492 527.71ZM329.989 515.182V519.727H316.849V515.182H329.989ZM319.832 509.955H325.884V530.295C325.884 530.854 325.969 531.29 326.139 531.602C326.31 531.905 326.546 532.118 326.849 532.241C327.162 532.365 327.522 532.426 327.929 532.426C328.213 532.426 328.497 532.402 328.781 532.355C329.065 532.298 329.283 532.256 329.435 532.227L330.386 536.73C330.083 536.825 329.657 536.934 329.108 537.057C328.559 537.189 327.891 537.27 327.105 537.298C325.647 537.355 324.368 537.161 323.27 536.716C322.181 536.271 321.333 535.58 320.727 534.642C320.121 533.705 319.823 532.521 319.832 531.091V509.955ZM340.45 524.386V537H334.399V507.909H340.28V519.031H340.536C341.028 517.743 341.823 516.735 342.922 516.006C344.02 515.267 345.398 514.898 347.055 514.898C348.571 514.898 349.892 515.229 351.018 515.892C352.155 516.545 353.036 517.488 353.661 518.719C354.295 519.94 354.607 521.403 354.598 523.108V537H348.547V524.188C348.556 522.843 348.215 521.796 347.524 521.048C346.842 520.3 345.886 519.926 344.655 519.926C343.831 519.926 343.102 520.101 342.467 520.452C341.842 520.802 341.35 521.313 340.99 521.986C340.64 522.649 340.46 523.449 340.45 524.386Z"
          fill="white"
        />
      </svg>

      <WorkerLine model={model} />
      {components}
    </>
  );
}
