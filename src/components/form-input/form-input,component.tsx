import { FC, InputHTMLAttributes } from "react"
import { FormInputLabel, Group, Input } from "./form-input.styles"

type FormInputProps = {
    label: string
} & InputHTMLAttributes<HTMLInputElement>

const FormInput: FC<FormInputProps> = ({ label, ...rest }) => {
    return (
        <Group>
            <Input {...rest} />
            {label &&
                (<FormInputLabel shrink={Boolean(rest.value && typeof rest.value === 'string' && rest.value.length)}>
                    {label}
                </FormInputLabel>
                )}
        </Group>
    )

}

export default FormInput