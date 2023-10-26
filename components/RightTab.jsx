
const RightTab = ({tab, handleClick}) => {

  return (
    <div
      key={tab.name}
      className={`tab-btn`}
      onClick={handleClick}

    >
      <img 
      src={tab.icon} 
      alt={tab.icon} 
      className='w-2/3 h-2/3'

      />

    </div>
  )
}

export default RightTab