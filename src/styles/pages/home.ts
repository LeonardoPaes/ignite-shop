import { styled } from "..";

export const HomeContainer = styled('main', {
    display: 'flex',
    // gap: '3rem',
    width: '100%',
    // maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
    marginLeft: 'auto',
    // minHeight: 656,
    // minHeight: 456,
    flex: 1,
    marginBottom: '7.5rem',
    height: '100%',
    // paddingBottom: '7.5rem',
})

export const Product = styled('div', {
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    // padding: '7rem',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    minWidth: 540,
    height: '100%',
    padding: '2rem',

    img: {
        objectFit: 'contain',
        width: '100%',
        height: '100%',
        // objectFit: 'cover',
        // width: '100%',
        // height: '100%'
    },

    footer: {
        position: 'absolute',
        bottom: '0.25rem',
        left: '0.25rem',
        right: '0.25rem',
        padding: '1.25rem 1.5rem 1.25rem 1.25rem',

        borderRadius: 6,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        backgroundColor: 'rgba(0,0,0,0.6)',

        transform: 'translateY(110%)',
        opacity: 0,
        transition: 'all 0.2s ease-in-out',

        div: {
            display: 'flex',
            flexDirection: 'column',
        },

        strong: {
            fontSize: '$lg',
            color: '$gray100'
        },

        span: {
            fontSize: '$xl',
            fontWeight: 'bold',
            color: '$green300',
            lineHeight: '1.6',
        },

        button: {
            border: 0,
            color: '$white',
            backgroundColor: '$green500',
            padding: '0.75rem',
            borderRadius: 6,
            lineHeight: 0,
            cursor: 'pointer',
            transition: 'background 0.3s',

            '&:hover': { 
                backgroundColor: '$green300',
            }
        }
    },

    '&.active': {
        footer: {
            transform: 'translateY(0%)',
            opacity: 1,
        }
    },

    '&:hover': {
        footer: {
            transform: 'translateY(0%)',
            opacity: 1,
        }
    }
})

export const ArrowButton = styled("button", {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "8.5rem",
    height: "100%",
    background:
        "linear-gradient(270deg, rgba(18, 18, 20, 0) 0%, rgba(18, 18, 20, 0.75) 100%)",
    cursor: "pointer",
    border: "none",
    outline: "none",
    color: "$white",
    fill: "$white",
    padding: "0 1rem",
    zIndex: 1,

    svg: {
        color: "$gray300",
        opacity: 0.6,
        transition: 'color 0.5s'
    },

    '&:not(:disabled):hover': {
        svg: {
            color: "$white",
            opacity: 1,
        },
    },

    variants: {
        direction: {
            left: {
                left: 0,
                textAlign: "left",
            },
            right: {
                right: 0,
                textAlign: "right",
                background:
                    "linear-gradient(90deg, rgba(18, 18, 20, 0) 0%, rgba(18, 18, 20, 0.75) 100%)",
            },
        },
        disabled: {
            true: {
                opacity: 0,
            },
        },
    },
})