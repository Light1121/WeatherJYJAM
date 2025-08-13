const Button = ({
  children,
  onClick,
}: {
  children: string
  onClick?: () => void
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
      }}
    >
      {children}
    </button>
  )
}

export default Button
