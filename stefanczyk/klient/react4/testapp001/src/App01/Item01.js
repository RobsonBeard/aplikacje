const Item01 = () => {
  const show = () => {
    window.alert('test')
  }

  return (
    <div className='itemBox'>
      <h1>ITEM01</h1>
      <button onClick={show} className='button1'>show alert</button>
    </div>
  )
}

export default Item01
