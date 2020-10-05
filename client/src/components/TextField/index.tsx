import TextField from "@material-ui/core/TextField";
import React from "react";
import { ITextFieldProps } from "./types";

const TextFieldInput = ({
    input,
    id = undefined,
    placeholder = undefined,
    variant = `standard`,
    type = undefined,
    ...custom
}: ITextFieldProps) => {
    return (
        <TextField
            id={id}
            placeholder={placeholder}
            variant={variant}
            type={type}
            {...input}
            {...custom}
        />
    )
}

export default TextFieldInput