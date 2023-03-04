

const Button = ({ text, color, onAdd}) => {
  return (
    <button className= 'btn' style={{backgroundColor: color}} onClick = {onAdd} >{ text }</button>
  )
}

Button.defaultProps = {
  color: "steelblue"
}



export default Button
