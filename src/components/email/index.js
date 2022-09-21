import React from 'react'
import AddSubscriber from './AddSubscriber'
import Group from './Group'
import SendMail from './SendMail'

export default function Email() {
  return (
    <>
        <>
            <div className='mail-page-container'>
                <div className='row m-0 p-0'>
                    <div className='col-md-6 col-sm-12 col-xl-4'>
                        <SendMail />
                    </div>
                </div>
            </div>
        </>
    </>
  )
}
