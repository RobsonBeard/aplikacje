const Item03 = (props) => {
  console.log(props.visible) // z jakiegos powodu sie loguje 2 razy
  let siema
  if (props.visible) {
    siema = 'block'
  } else {
    siema = 'none'
  }

  return (
    <div className='itemBox'>
      <div>
        <h1 style={{ display: siema }}>ITEM</h1>
      </div>
    </div>
  )
}

export default Item03
