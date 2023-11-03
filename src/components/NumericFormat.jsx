import { AutoTextSize } from "auto-text-size";
import React from 'react';

const NumericFormat = ({value, maxLimit, className, autoTextSize}) => {
    let formatedText = Number(value);
    if(maxLimit && value.toString().length > maxLimit) {
        // if max limit enabled, convert number to scientific notation if larger than maxLimit
        formatedText = Number.parseFloat(formatedText).toExponential(2);
    }

    // add thousand separator
    formatedText = formatedText.toLocaleString();
  return (
    // <span className={`select-none ${className}`}>{formatedText}</span>
    <span className={`select-none ${className}`}>
        { autoTextSize ? (
            <AutoTextSize
                mode = {autoTextSize.mode}
                minFontSizePx={autoTextSize.minFontSize}
                maxFontSizePx={autoTextSize.maxFontSize}
                as={"p"}
                className="ml-auto"
            >
              { formatedText }
            </AutoTextSize>
        ) : (
         formatedText
        )}
    </span>
  )
}

export default NumericFormat