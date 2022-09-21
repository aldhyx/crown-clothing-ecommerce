import { FormInputLabel, Group, Input } from "./form-input.styles"

const FormInput = ({ label, ...rest }) => {
    return (
        <Group>
            <Input {...rest} />
            {label &&
                (<FormInputLabel shrink={rest.value.length}>
                    {label}
                </FormInputLabel>
                )}
        </Group>
    )

}

export default FormInput