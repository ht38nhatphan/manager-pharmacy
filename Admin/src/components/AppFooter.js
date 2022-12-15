import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          Manager &amp; Dashboard Pharamacy
        </a>
        <span className="ms-1">&copy; 2022 .</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Code by</span>
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          Nhat &amp; Dashboard Pharamacy
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
