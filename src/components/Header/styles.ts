import { styled } from "@/styles";

export const HeaderContainer = styled('header', {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  flex: 0,

  button: {
      position: 'relative',
      border: 0,
      color: '$white',
      backgroundColor: '$gray800',
      padding: '0.75rem',
      borderRadius: 6,
      lineHeight: 0,
      transition: 'opacity 0.2s',
      cursor: 'pointer',

      '&:hover': {
          opacity: 0.6
      },

      span: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        position: 'absolute',
        top: -7,
        right: -7,

        width: 24,
        height: 24,

        color: '$white',
        background: '$green500',
        borderRadius: '50%',

        border: '3px solid $gray900',

        fontWeight: 'bold',
      }
  }
})