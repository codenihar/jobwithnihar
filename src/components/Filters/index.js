import './index.css'

const Filters = props => {
  const {
    salaryRangesList,
    employmentTypesList,
    onChangeSalaryRange,
    onSelectEmploymentType,
    employmentType,
  } = props

  const changeSalaryRangeFilter = event => {
    onChangeSalaryRange(event.target.value)
  }

  const addEmploymentType = event => {
    let updatedEmploymentTypeArray
    if (event.target.checked) {
      updatedEmploymentTypeArray = [...employmentType]
      updatedEmploymentTypeArray.push(event.target.value)
    } else {
      updatedEmploymentTypeArray = [...employmentType]
      const selectedIndex = updatedEmploymentTypeArray.findIndex(
        item => item === event.target.value,
      )
      updatedEmploymentTypeArray.splice(selectedIndex, 1)
    }
    onSelectEmploymentType(updatedEmploymentTypeArray)
  }

  const renderEmploymentTypeFilters = () => (
    <div className="filters-container">
      <h1 className="filters-heading">Type of Employment</h1>
      <ul className="filters-list">
        {employmentTypesList.map(item => {
          const {label, employmentTypeId} = item
          return (
            <li key={employmentTypeId} className="filter-item">
              <input
                type="checkbox"
                className="filter-checkbox"
                id={employmentTypeId}
                onClick={addEmploymentType}
                value={employmentTypeId}
              />
              <label htmlFor={employmentTypeId} className="filter-text">
                {label}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )

  const renderSalaryRangesFilters = () => (
    <div className="filters-container">
      <h1 className="filters-heading">Salary Range</h1>
      <ul className="filters-list">
        {salaryRangesList.map(item => {
          const {label, salaryRangeId} = item
          return (
            <li key={salaryRangeId} className="filter-item">
              <input
                type="radio"
                className="filter-checkbox"
                id={salaryRangeId}
                name="salary range"
                onChange={changeSalaryRangeFilter}
                value={salaryRangeId}
              />
              <label htmlFor={salaryRangeId} className="filter-text">
                {label}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )

  return (
    <div className="filters-bg-container">
      <hr className="filters-horizontal-line" />
      {renderEmploymentTypeFilters()}
      <hr className="filters-horizontal-line" />
      {renderSalaryRangesFilters()}
    </div>
  )
}

export default Filters
