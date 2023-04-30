
import { styled } from '@/styles';
export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '100vh',
})

export const Header = styled('header', {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',

    button: {
        border: 0,
        color: '$white',
        backgroundColor: '$gray800',
        padding: '0.75rem',
        borderRadius: 6,
        lineHeight: 0,
    }
})