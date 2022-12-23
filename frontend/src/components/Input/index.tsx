import React, {
    InputHTMLAttributes,
    useRef,
    useState,
    useCallback,
} from 'react';

import { IconBaseProps } from 'react-icons';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
    icon2?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, icon2: Icon2, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [isShow, setIsShow] = useState(false);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);

        if (inputRef.current?.value) {
            setIsFilled(true);
        } else {
            setIsFilled(false);
        }
    }, []);

    function handleClickEye() {
        setIsShow(!isShow)
    }

    return (
        <Container isFilled={isFilled} isFocused={isFocused}>
            {Icon && <Icon size={20} />}
            <input
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                ref={inputRef}
                {...rest}
                type={(Icon2 && !isShow) ? "password" : "text"}
            />
            {Icon2 && isShow && <FiEyeOff size={20} onClick={handleClickEye} style={{cursor: 'pointer'}} />}
            {Icon2 && !isShow && <FiEye size={20} onClick={handleClickEye} style={{cursor: 'pointer'}} />}
        </Container>
    );
};

export default Input;
