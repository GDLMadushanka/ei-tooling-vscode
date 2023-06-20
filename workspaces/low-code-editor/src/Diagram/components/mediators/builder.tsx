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

export function Builder(props: SquareProps) {
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
        <circle cx="300" cy="300" r="300" fill="#7C3838" />
        <path
          d="M237.528 517V487.909H249.176C251.316 487.909 253.101 488.226 254.531 488.861C255.961 489.495 257.036 490.376 257.756 491.503C258.475 492.62 258.835 493.908 258.835 495.366C258.835 496.503 258.608 497.502 258.153 498.364C257.699 499.216 257.074 499.917 256.278 500.466C255.492 501.006 254.593 501.389 253.58 501.616V501.901C254.688 501.948 255.724 502.26 256.69 502.838C257.666 503.416 258.456 504.225 259.062 505.267C259.669 506.299 259.972 507.53 259.972 508.96C259.972 510.504 259.588 511.882 258.821 513.094C258.063 514.296 256.941 515.248 255.455 515.949C253.968 516.65 252.135 517 249.957 517H237.528ZM243.679 511.972H248.693C250.407 511.972 251.657 511.645 252.443 510.991C253.229 510.329 253.622 509.448 253.622 508.349C253.622 507.545 253.428 506.834 253.04 506.219C252.652 505.603 252.098 505.12 251.378 504.77C250.668 504.42 249.82 504.244 248.835 504.244H243.679V511.972ZM243.679 500.082H248.239C249.081 500.082 249.83 499.936 250.483 499.642C251.146 499.339 251.667 498.913 252.045 498.364C252.434 497.814 252.628 497.156 252.628 496.389C252.628 495.338 252.254 494.491 251.506 493.847C250.767 493.203 249.716 492.881 248.352 492.881H243.679V500.082ZM277.852 507.71V495.182H283.903V517H278.093V513.037H277.866C277.373 514.315 276.554 515.343 275.408 516.119C274.272 516.896 272.885 517.284 271.246 517.284C269.788 517.284 268.505 516.953 267.397 516.29C266.289 515.627 265.423 514.685 264.798 513.463C264.182 512.241 263.87 510.778 263.86 509.074V495.182H269.911V507.994C269.921 509.282 270.266 510.3 270.948 511.048C271.63 511.796 272.544 512.17 273.69 512.17C274.419 512.17 275.101 512.005 275.735 511.673C276.37 511.332 276.881 510.83 277.269 510.168C277.667 509.505 277.861 508.686 277.852 507.71ZM288.743 517V495.182H294.794V517H288.743ZM291.783 492.369C290.883 492.369 290.111 492.071 289.467 491.474C288.833 490.868 288.516 490.144 288.516 489.301C288.516 488.468 288.833 487.753 289.467 487.156C290.111 486.55 290.883 486.247 291.783 486.247C292.682 486.247 293.449 486.55 294.084 487.156C294.728 487.753 295.05 488.468 295.05 489.301C295.05 490.144 294.728 490.868 294.084 491.474C293.449 492.071 292.682 492.369 291.783 492.369ZM305.692 487.909V517H299.641V487.909H305.692ZM318.58 517.355C316.922 517.355 315.421 516.929 314.077 516.077C312.741 515.215 311.681 513.951 310.895 512.284C310.118 510.608 309.73 508.553 309.73 506.119C309.73 503.619 310.133 501.541 310.938 499.884C311.742 498.217 312.813 496.972 314.148 496.148C315.492 495.314 316.965 494.898 318.565 494.898C319.787 494.898 320.805 495.106 321.619 495.523C322.443 495.93 323.106 496.441 323.608 497.057C324.119 497.663 324.508 498.259 324.773 498.847H324.957V487.909H330.994V517H325.028V513.506H324.773C324.489 514.112 324.086 514.713 323.565 515.31C323.054 515.897 322.386 516.384 321.562 516.773C320.748 517.161 319.754 517.355 318.58 517.355ZM320.497 512.54C321.473 512.54 322.296 512.275 322.969 511.744C323.651 511.205 324.171 510.452 324.531 509.486C324.901 508.52 325.085 507.388 325.085 506.091C325.085 504.794 324.905 503.667 324.545 502.71C324.186 501.754 323.665 501.015 322.983 500.494C322.301 499.973 321.473 499.713 320.497 499.713C319.503 499.713 318.665 499.983 317.983 500.523C317.301 501.062 316.785 501.811 316.435 502.767C316.084 503.723 315.909 504.831 315.909 506.091C315.909 507.36 316.084 508.482 316.435 509.457C316.795 510.423 317.311 511.181 317.983 511.73C318.665 512.27 319.503 512.54 320.497 512.54ZM345.913 517.426C343.668 517.426 341.737 516.972 340.117 516.062C338.507 515.144 337.267 513.847 336.396 512.17C335.524 510.485 335.089 508.491 335.089 506.19C335.089 503.946 335.524 501.976 336.396 500.281C337.267 498.586 338.493 497.265 340.075 496.318C341.665 495.371 343.531 494.898 345.671 494.898C347.111 494.898 348.451 495.13 349.691 495.594C350.941 496.048 352.03 496.735 352.958 497.653C353.896 498.572 354.625 499.727 355.146 501.119C355.666 502.502 355.927 504.121 355.927 505.977V507.639H337.504V503.889H350.231C350.231 503.018 350.041 502.246 349.663 501.574C349.284 500.902 348.758 500.376 348.086 499.997C347.423 499.609 346.651 499.415 345.771 499.415C344.852 499.415 344.038 499.628 343.327 500.054C342.627 500.471 342.077 501.034 341.68 501.744C341.282 502.445 341.078 503.226 341.069 504.088V507.653C341.069 508.733 341.268 509.666 341.665 510.452C342.073 511.238 342.646 511.844 343.384 512.27C344.123 512.696 344.999 512.909 346.012 512.909C346.684 512.909 347.3 512.814 347.859 512.625C348.417 512.436 348.896 512.152 349.293 511.773C349.691 511.394 349.994 510.93 350.202 510.381L355.799 510.75C355.515 512.095 354.933 513.269 354.052 514.273C353.181 515.267 352.054 516.044 350.671 516.602C349.298 517.152 347.712 517.426 345.913 517.426ZM359.876 517V495.182H365.742V498.989H365.969C366.367 497.634 367.035 496.612 367.972 495.92C368.91 495.22 369.989 494.869 371.211 494.869C371.514 494.869 371.841 494.888 372.191 494.926C372.541 494.964 372.849 495.016 373.114 495.082V500.452C372.83 500.366 372.437 500.291 371.935 500.224C371.433 500.158 370.974 500.125 370.558 500.125C369.667 500.125 368.872 500.319 368.171 500.707C367.48 501.086 366.931 501.616 366.523 502.298C366.126 502.98 365.927 503.766 365.927 504.656V517H359.876Z"
          fill="white"
        />
        <path
          d="M202.617 428.498L372.826 428.498C412.919 428.498 421.449 420.748 421.449 384.105L421.449 184.387C421.449 147.786 412.933 140 372.826 140L208.701 140V151.775L372.826 151.775C405.878 151.775 408.549 154.213 408.549 184.387L408.549 384.105C408.549 414.274 405.878 416.723 372.826 416.723L202.617 416.723C169.571 416.723 166.9 414.285 166.9 384.105L166.9 189.932H154L154 384.105C154 420.748 162.518 428.498 202.617 428.498Z"
          fill="white"
        />
        <path
          d="M200.703 147.314L162.001 182.641H200.703V147.314Z"
          fill="white"
        />
        <path
          d="M321.779 370.725H315.108V332.433H321.779V370.725Z"
          fill="white"
        />
        <path
          d="M318.458 303.407C315.932 303.407 313.716 302.619 311.779 301.061C309.866 299.52 308.889 297.307 308.889 294.425V273.818C308.889 271.115 309.853 268.979 311.779 267.437C313.701 265.896 315.917 265.114 318.458 265.114C320.978 265.114 323.27 265.896 325.141 267.437C327.038 268.989 327.994 271.115 327.994 273.818V294.425C327.994 297.305 327.048 299.519 325.141 301.061C323.27 302.619 320.978 303.407 318.458 303.407ZM321.299 272.943C321.299 271.183 320.386 270.311 318.458 270.311C316.524 270.311 315.572 271.183 315.572 272.943V295.587C315.572 297.317 316.511 298.191 318.458 298.191C320.366 298.191 321.299 297.317 321.299 295.587V272.943Z"
          fill="white"
        />
        <path
          d="M318.458 236.067C315.932 236.067 313.716 235.285 311.779 233.744C309.866 232.205 308.889 229.972 308.889 227.075V206.493C308.889 203.801 309.853 201.641 311.779 200.098C313.701 198.557 315.917 197.775 318.458 197.775C320.978 197.775 323.27 198.557 325.141 200.098C327.038 201.639 327.994 203.801 327.994 206.493V227.075C327.994 229.972 327.048 232.205 325.141 233.744C323.27 235.285 320.978 236.067 318.458 236.067ZM321.299 205.616C321.299 203.856 320.386 202.993 318.458 202.993C316.524 202.993 315.572 203.856 315.572 205.616V228.237C315.572 229.997 316.511 230.871 318.458 230.871C320.366 230.871 321.299 229.997 321.299 228.237V205.616Z"
          fill="white"
        />
        <path
          d="M379.919 370.725C377.393 370.725 375.156 369.962 373.236 368.408C371.339 366.867 370.331 364.653 370.331 361.743V341.158C370.331 338.461 371.326 336.318 373.236 334.777C375.144 333.236 377.38 332.443 379.919 332.443C382.488 332.443 384.706 333.236 386.628 334.777C388.486 336.316 389.482 338.461 389.482 341.158V361.743C389.482 364.653 388.486 366.865 386.628 368.408C384.719 369.949 382.501 370.725 379.919 370.725ZM382.784 340.274C382.784 338.52 381.826 337.653 379.917 337.653C377.982 337.653 377.002 338.52 377.002 340.274V362.899C377.002 364.653 377.972 365.533 379.917 365.533C381.814 365.533 382.784 364.665 382.784 362.899V340.274Z"
          fill="white"
        />
        <path
          d="M379.919 303.407C377.393 303.407 375.156 302.619 373.236 301.061C371.339 299.52 370.331 297.307 370.331 294.425V273.818C370.331 271.115 371.326 268.979 373.236 267.437C375.146 265.894 377.38 265.114 379.919 265.114C382.488 265.114 384.706 265.896 386.628 267.437C388.486 268.989 389.482 271.115 389.482 273.818V294.425C389.482 297.305 388.486 299.519 386.628 301.061C384.719 302.619 382.501 303.407 379.919 303.407ZM382.784 272.943C382.784 271.183 381.826 270.311 379.917 270.311C377.982 270.311 377.002 271.183 377.002 272.943V295.587C377.002 297.317 377.972 298.191 379.917 298.191C381.814 298.191 382.784 297.317 382.784 295.587V272.943Z"
          fill="white"
        />
        <path
          d="M383.231 236.067H376.555V197.773H383.231V236.067Z"
          fill="white"
        />
        <path
          d="M256.979 370.725C254.446 370.725 252.228 369.962 250.29 368.408C248.401 366.867 247.403 364.653 247.403 361.743V341.158C247.403 338.461 248.388 336.318 250.29 334.777C252.218 333.236 254.436 332.443 256.979 332.443C259.536 332.443 261.754 333.236 263.657 334.777C265.559 336.316 266.517 338.461 266.517 341.158V361.743C266.517 364.653 265.573 366.865 263.657 368.408C261.752 369.949 259.536 370.725 256.979 370.725ZM259.852 340.274C259.852 338.52 258.882 337.653 256.979 337.653C255.077 337.653 254.07 338.52 254.07 340.274V362.899C254.07 364.653 255.052 365.533 256.979 365.533C258.882 365.533 259.852 364.665 259.852 362.899V340.274Z"
          fill="white"
        />
        <path
          d="M256.979 303.407C254.446 303.407 252.228 302.619 250.29 301.061C248.401 299.52 247.403 297.307 247.403 294.425V273.818C247.403 271.115 248.388 268.979 250.29 267.437C252.218 265.896 254.436 265.114 256.979 265.114C259.536 265.114 261.754 265.896 263.657 267.437C265.559 268.989 266.517 271.115 266.517 273.818V294.425C266.517 297.305 265.573 299.519 263.657 301.061C261.752 302.619 259.536 303.407 256.979 303.407ZM259.852 272.943C259.852 271.183 258.882 270.311 256.979 270.311C255.077 270.311 254.07 271.183 254.07 272.943V295.587C254.07 297.317 255.052 298.191 256.979 298.191C258.882 298.191 259.852 297.317 259.852 295.587V272.943Z"
          fill="white"
        />
        <path
          d="M260.316 236.067H253.639V197.773H260.316V236.067Z"
          fill="white"
        />
        <path
          d="M195.512 370.725C193.004 370.725 190.776 369.962 188.833 368.408C186.944 366.867 185.961 364.653 185.961 361.743V341.158C185.961 338.461 186.944 336.318 188.833 334.777C190.749 333.236 192.992 332.443 195.512 332.443C198.081 332.443 200.297 333.236 202.24 334.777C204.104 336.316 205.112 338.461 205.112 341.158V361.743C205.112 364.653 204.106 366.865 202.24 368.408C200.297 369.949 198.081 370.725 195.512 370.725ZM198.396 340.274C198.396 338.52 197.45 337.653 195.51 337.653C193.608 337.653 192.601 338.52 192.601 340.274V362.899C192.601 364.653 193.594 365.533 195.51 365.533C197.438 365.533 198.396 364.665 198.396 362.899V340.274Z"
          fill="white"
        />
        <path
          d="M195.512 303.407C193.004 303.407 190.776 302.619 188.833 301.061C186.944 299.52 185.961 297.307 185.961 294.425V273.818C185.961 271.115 186.944 268.979 188.833 267.437C190.749 265.896 192.992 265.114 195.512 265.114C198.081 265.114 200.297 265.896 202.24 267.437C204.104 268.989 205.112 271.115 205.112 273.818V294.425C205.112 297.305 204.106 299.519 202.24 301.061C200.297 302.619 198.081 303.407 195.512 303.407ZM198.396 272.943C198.396 271.183 197.45 270.311 195.51 270.311C193.608 270.311 192.601 271.183 192.601 272.943V295.587C192.601 297.317 193.594 298.191 195.51 298.191C197.438 298.191 198.396 297.317 198.396 295.587V272.943Z"
          fill="white"
        />
        <path
          d="M198.837 236.067H192.185V197.773H198.837V236.067Z"
          fill="white"
        />
        <ellipse
          cx="392.017"
          cy="395.454"
          rx="63.9831"
          ry="63.5458"
          fill="#7C3838"
        />
        <path
          d="M381.379 364.952H397.536V401.058L411.674 387.017L421.449 396.725L389.458 428.498L357.466 396.725L367.241 387.017L381.379 401.058V364.952Z"
          fill="white"
        />
      </svg>

      <WorkerLine model={model} />
      {components}
    </>
  );
}