import { styled } from "@/styles";


export const CartContainer = styled('div', {
    position: 'absolute',
    right: 0,
    top: 0, 
    transform: 'translateX(110%)',
    opacity: 0,
    transition: 'all 0.3s ease-in-out',
    backgroundColor: '$gray800',
    padding: '3rem',

    height: '100vh',
    width: '34%',

    zIndex: 3,

    display: 'flex',
    flexDirection: 'column',

    h4: {
        fontSize: '$lg'
    },

    variants: {
        show: {
            true: {
                transform: 'translateX(0%)',
                opacity: 1,
            },
            false: {
                transform: 'translateX(110%)',
                opacity: 0,
            }
        }
    }
})

export const CartBackground = styled('div', {
    position: 'fixed',
    top: 0,
    left: 0,
    background: 'rgba(0,0,0,0.3)',
    width: '100%',
    height: '100%',
    zIndex: 2,
    transition: 'all 0.3s ease-in-out',

    variants: {
        show: {
            true: {
                // transform: 'translateX(0%)',
                visibility: 'show',
                opacity: 1,
            },
            false: {
                // transform: 'translateX(110%)',
                visibility: 'hidden',
                opacity: 0,
            }
        }
    }
})

export const ProductsContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    flex: 1,
    marginTop: '2rem',
    overflowY: 'auto',

    '&::-webkit-scrollbar': {
        width: '10px',
    },
    
    '&::-webkit-scrollbar-track': {
        background: 'transparent', 
    },
    
    '&::-webkit-scrollbar-thumb': {
        background: '$gray900', 
        borderRadius: '6px',
    },
    
    // '&::-webkit-scrollbar-thumb:hover': {
    //     opacity: 0.3,
    // },
})

export const Product = styled('div', {
    display: 'flex',
    gap: '1.25rem',

    div: {
        display: 'flex',
        flexDirection: 'column',

        span: {
            lineHeight: 1.4,
        },

        strong: {
            marginTop: '0.25rem',
            lineHeight: 1.4,
        },

        a: {
            color: '$green500',
            textDecoration: 'none',
            marginTop: '0.5rem',
            lineHeight: 1.6,
        }
    }
})

export const CartFooter = styled('div', {
    flex: 0,
    marginTop: '1rem',

    display: 'flex',
    flexDirection: 'column',

    div: {
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: '0.5rem',

        h4: {
            fontSize: '$xl'
        },

        '& span:nth-child(even)': {
            textAlign: 'right'
        }
    },

    button: {
        marginTop: '3.5rem',
        padding: '1.25rem 2rem',
        width: '100%',

        borderRadius: '8px',
        border: 0,

        color: '$white',
        background: '$green500',
        cursor: 'pointer',
        
        fontWeight: 'bold',
        fontSize: '$md',

        '&:disabled': {
            opacity: 0.6,
            cursor: 'not-allowed',
        },

        '&:not(:disabled):hover': {
            backgroundColor: '$green300',
        }
    },
})

export const ImageContainer = styled('div', {
    width: '100%',
    maxWidth: 102,
    height: 93,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    padding: '0.25rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    img: {
        objectFit: 'cover',
    }
})