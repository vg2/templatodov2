import Button from '@mui/joy/Button'
import AddIcon from '@mui/icons-material/Add';

type FloatingActionButtonProps = {
    onClick: () => void;
}

function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
    return (
        <Button
            variant="solid"
            color="primary"
            sx={{
                position: 'fixed',
                bottom: '96px',
                right: '16px',
                borderRadius: '50%',
                width: '56px',
                height: '56px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            }}
            onClick={onClick}
        >
            <AddIcon />
        </Button>
    );
}

export default FloatingActionButton;
