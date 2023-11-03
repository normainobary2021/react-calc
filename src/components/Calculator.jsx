import { ArrowUUpLeft, Clock, Divide, Dot, Equals, Minus, Percent, Plus, PlusMinus, SelectionInverse, X } from "@phosphor-icons/react";
import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import NumericFormat from "./NumericFormat";

const Buttons = {
    row1: [
        { value: "AC", label: "AC", className: "bg-light-300 dark:bg-dark-300", type: "clear" },
        { value: "+/-", label: <PlusMinus size={25} />, className: "bg-light-300 dark:bg-dark-300", type: "plusminus" },
        { value: "%", label: <Percent size={25} />, className: "bg-light-300 dark:bg-dark-300", type: "percent" },
        { value: "/", label: <Divide size={25} />, className: "bg-light-300 dark:bg-dark-300", type: "operator" },
    ],
    row2: [
        { value: "7", label: "7", type: "number" },
        { value: "8", label: "8", type: "number" },
        { value: "9", label: "9", type: "number" },
        { value: "*", label: <X size={25} />, className: "!bg-primary text-white", type: "operator" },
    ],
    row3: [
        { value: "4", label: "4", type: "number" },
        { value: "5", label: "5", type: "number" },
        { value: "6", label: "6", type: "number" },
        { value: "-", label: <Minus size={25} />, className: "!bg-primary text-white", type: "operator" },
    ],
    row4: [
        { value: "1", label: "1", type: "number" },
        { value: "2", label: "2", type: "number" },
        { value: "3", label: "3", type: "number" },
        { value: "+", label: <Plus size={25} />, className: "!bg-primary text-white", type: "operator" },
    ],
    row5: [
        { value: "0", label: "0", className: "col-span-2", type: "number" },
        { value: ".", label: <Dot size={25} />, type: "dot" },
        { value: "=", label: <Equals size={25} />, className: "!bg-primary text-white", type: "equal", },
    ],
}


const Calculator = () => {
    const buttonsRef = useRef([]);
    const backspaceBtnRef = useRef(null);
    const [inputValue, setInputValue] = useState([]);
    const [result, setResult] = useState(0);
    const [calculated, setCalculated] = useState(false);
    const [history, setHistory] = useState([]);


    const handleButtonClick = (value) => {

        // if value calculated
        if (calculated && value !== "=") {
            setInputValue([]);
            setResult(0);
            setCalculated(false);
        }
        // get all the clicked button details from buttons array
        const button = Object.values(Buttons).flat().find((item) => item.value === value);
        
        // if value calculated add current result as lastInputValue
        let resultValue;
        if (calculated) {
            // if result value is too big  we will convert it to scientific notation so covert it back to number then string
            resultValue = BigInt(result).toString();
        }

        // we will store input values in an array
        // get the last element of array
        const lastInputValue = calculated ? { value: resultValue, label: resultValue, type: "number" } : inputValue[inputValue.length - 1];

        // function to handle unary operations
        const handleUnaryOperations = (operation) => {
            if(lastInputValue && lastInputValue.type === "number") {
                // perform the function on the last value 
                const newInputValue = {
                    ...lastInputValue,
                    value: operation(lastInputValue.value),
                    label: operation(lastInputValue.value),
                };
                // update the value in inputValue array
                setInputValue((prev) => [...prev.slice(0, -1), newInputValue]);
            }
        };

        // function to handle Numbers
        const handleNumber = () => {
            if (lastInputValue && lastInputValue.type === "number") {
                // if last value is also a number then add in the last value
                let newValue = lastInputValue.value;
                if (lastInputValue.value.toString().length < 15) {
                    // add a limit of 15 characters
                    newValue = lastInputValue.value + value;
                }
                const newInputValue = {
                    ...lastInputValue,
                    value: newValue,
                    label: newValue,
                };
                // update the new value
                setInputValue((prev) => [...prev.slice(0, -1), newInputValue]);
            } else {
                // if last value is not a number, then just add current as new
                setInputValue((prev) => [...prev, button]);
            }
        };

        // function to handle operators
        const handleOperator = () => {
            if (inputValue.length > 0) {
                // only allow operator if input value not empty
                if (lastInputValue && lastInputValue.type === "operator") {
                    // if last value is already an operator then just replace it
                    const newInputValue = {
                        ...lastInputValue,
                        value: button.value,
                        label: button.label
                    }
                    setInputValue((prev) => [...prev.slice(0, -1), newInputValue]);
                } else {
                    // if last value is not operator then add operator
                    setInputValue((prev) => [...prev.slice(0, -1), lastInputValue, button]);
                }
            }
        }

        // function to handle Dot
        const handleDot = () => {
            if (lastInputValue && lastInputValue.type === "number") {
                // if last input value is a number add a dot
                let newValue = lastInputValue.value;
                if (!lastInputValue.value.includes(".")) {
                    // if dot doesn't already exist add one
                    newValue = lastInputValue.value + ".";
                }
                const newInputValue = {
                    ...lastInputValue,
                    value: newValue,
                    label: newValue,
                };
                // update value
                setInputValue((prev) => [...prev.slice(0, -1), newInputValue]);
            } else if (!lastInputValue || lastInputValue.type !== "number") {
                // if there is no last value or its not a number
                const newInputValue = { value: "0.", label: "0.", type: "number" };
                setInputValue((prev) => [...prev, newInputValue]);
            }
        };

        // function to handle Clear
        const handleClear = () => {
            setInputValue([]);
            setResult(0);
            setCalculated(false);
        };

        // function to handle Equal
        const handleEqual = () => {
            if (inputValue.length > 0) {
                calculate();
            }
        };

        switch(button.type) {
            case "number":
                handleNumber();
                break;
            case "operator":
                handleOperator();
                break;
            case "plusminus":
                handleUnaryOperations((num) => -num);
                break;
            case "percent":
                handleUnaryOperations((num) => num / 100);
                break;
            case "dot":
                handleDot();
                break;
            case "clear":
                handleClear();
                break;
            case "equal":
                handleEqual();
                break;
        }
    };

    const handleKeyButtonPress = (btn) => {
        buttonsRef.current[btn].click();
        // add a click animation
        buttonsRef.current[btn].classList.add("ring-2", "ring-blue-500");
        // remove after 2ms
        setTimeout(() => {
            buttonsRef.current[btn].classList.remove("ring-2", "ring-blue-500");
        }, 200);
    };


    const handleKeyPress = (e) => {
        if(buttonsRef.current[e.key]) {
            // if pressed key is from buttons
            handleKeyButtonPress(e.key);
        }

        // if backspace pressed
        if (e.key === "Backspace") {
            // handleBackspace
            backspaceBtnRef.current && backspaceBtnRef.current.click();
        }

        // if enter pressed
        if (e.key === "Enter") {
            // enter key
            handleKeyButtonPress("=");
        }

        // if up arrow is pressed
        if (e.key === "ArrowUp") {
            // arrow up key
            history.length > 1 && handleRestoreHistory(history[history.length - 1]);
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    const handleBackspace = () => {
        if (inputValue.length > 0) {
            const lastInputValue = inputValue[inputValue.length - 1];
            if (lastInputValue.type === "number" && lastInputValue.value.toString().length > 1) {
                // if the last value is a number and more than 1 characters, only remove last character from the last value
                const newInputValue = {
                    ...lastInputValue,
                    value: lastInputValue.value.slice(0, -1),
                    label: lastInputValue.value.slice(0, -1),
                };
                // update value
                setInputValue((prev) => [...prev.slice(0, -1), newInputValue]);
            } else {
                // else remove whole last value
                setInputValue((prev) => [...prev.slice(0, -1)]);
            }
        }
    };

    const calculate = () => {
        const inputValueToCalculate = [...inputValue];
        const lastInputValue = inputValueToCalculate[inputValueToCalculate.length - 1];
        
        // if there is an operator in last value remove it
        if (lastInputValue && lastInputValue.type === "operator") {
            inputValueToCalculate.pop();
            setInputValue(inputValueToCalculate);
        }

        // create expression from input value
        const expression = inputValueToCalculate.map((item) => {
            // remove leading zeros
            if (item.type === "number") {
                return Number(item.value);
            }
            return item.value;
        }).join("");

        // solve the expression
        try {
            const newResult = eval(expression);
            if (isNaN(newResult) || !isFinite(newResult)) {
                // if not a number
                throw new Error("Invalid Expression");
            }

            setResult(newResult);
            setCalculated(true);
            setHistory((prev) => [
                ...prev,
                {
                    inputValue,
                    result: newResult,
                },
            ])

        } catch (error) {
            console.log(error);
        }
    }

    const handleRestoreHistory = (historyItem) => {
        // restore all values
        setInputValue(historyItem.inputValue);
        setResult(historyItem.result);
        setCalculated(true);
        // remove last item from history
        setHistory((prev) => prev.slice(0, -1));
    }


    const renderInputValue = () => {
        // if input value is empty, return a 0
        if(!inputValue.length)
            return <span>0</span>
        // else map input value
        return inputValue.map((item,index) => {
            return item.type === "number" ? (
                // let's format the long numbers with thousands separator
                <NumericFormat key={index} value={item.value} />
                ) : (
                    // if it is operator add class text-primary
                <span key={index} className="text-primary">{item.label}</span>
                );
        })
    }

    return (
    <>
        <div className='mb-2 px-4'>
            

            <div className='flex min-h-[9rem] flex-col items-end justify-end py-4 text-right'>
                {/* render history */}

                {
                    history.length > 1 && (
                        <div 
                            className="mb-4 flex cursor-pointer items-center gap-2 rounded-full bg-light-200 px-2 py-0.5 text-xs dark:bg-dark-300"
                            onClick={() => handleRestoreHistory(history[history.length-2] || history[history.length-1])}
                        >
                            <Clock size={15} />
                            <NumericFormat
                                value={history[history.length - 2].result || history[history.length - 1].result}
                            />
                        </div>
                    )
                }
                <NumericFormat
                    value={result}
                    className='w-full text-6xl text-textDark dark:text-white'
                    maxLimit={20}
                    autoTextSize={{mode: "oneline", minFontSize: 20, maxFontSize: 50,}}
                />
            </div>
        </div>
        <div className='flex items-center justify-center bg-light-100 px-4 py-2 dark:bg-dark-100'>
            <span 
                className="mr-3 cursor-pointer hover:text-black dark:hover:text-white"
                ref={backspaceBtnRef}
                onClick={handleBackspace}
            >
                <ArrowUUpLeft size={20} />
            </span>
            <div className="flex w-full items-center overflow-x-auto text-2xl font-extralight [&>*:first-child]:ml-auto">
                {
                    renderInputValue()
                }
            </div>
        </div>
        {/* Keyboard */}
        <div className='flex items-center justify-between p-4'>
            <div className='flex w-full flex-col gap-1 rounded-lg'>
                {
                    Object.keys(Buttons).map((key)=> (
                        <div className='grid grid-cols-4 gap-1' key={key}>
                            {
                                Buttons[key].map((item)=> (
                                    <Button
                                        key={item.value}
                                        className={"w-full" + " " + item.className || ""}
                                        ref={(button) => {
                                            buttonsRef.current[item.value] = button;
                                        }}
                                        onClick = {() => handleButtonClick(item.value)}
                                    >
                                        {item.label}
                                    </Button>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    </>
  )
}

export default Calculator