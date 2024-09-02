import Button from '@mui/joy/Button'
import { PropsWithChildren } from 'react';

type RoundedButtonProps = {
    onClick: () => void;
}

function RoundedButton({ onClick, children }: PropsWithChildren<RoundedButtonProps>) {
    return (
        <Button
            variant="solid"
            color="primary"
            sx={{ 
                borderRadius: '50%',
                width: '56px',
                height: '56px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            }}
            onClick={onClick}
        >
            {children}
        </Button>
    );
}

export default RoundedButton;
