import React from 'react'
import Left_panel from '../Left_panel'
import Sub_header from '../Sub_header'

const Transporter_wallet = () => {
  return (
    <div>
        <div className='row'>
            <div className='col-3'><Left_panel value={8}/></div>
            <div className='col-9' style={{marginLeft:"-60px"}}>
                <Sub_header/>
                <section>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div class="d-block mb-4 mb-md-0">
                    <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
                        <ol class="breadcrumb breadcrumb-dark breadcrumb-transparent">
                            <li class="breadcrumb-item">
                                <a href="#">
                                    <svg class="icon icon-xxs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                </a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Payouts</li>
                        </ol>
                    </nav>
                    <h2 class="h4">All Payouts</h2>
                </div>
                <div class="btn-toolbar mb-2 mb-md-0">
                    <div class="input-group me-2 me-lg-3 fmxw-400">
                        <span class="input-group-text">
                            <svg class="icon icon-xs" x-description="Heroicon name: solid/search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                            </svg>
                        </span>
                        <input type="text" class="form-control" placeholder="Search Transaction" />
                    </div>
                    <button  data-bs-toggle="modal" data-bs-target="#modal-transporter-payout"  type="button" class="btn btn-primary">Pay to Transporter</button>
                </div>
            </div>
            <section>
                <ul class="nav nav-tabs justify-content-end">
                    <li class="nav-item">
                      <a class="nav-link active" href="#">All</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Paid</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Pending</a>
                    </li>
                </ul>
            </section>
            <div class="card card-body border-0 shadow table-wrapper table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th class="border-gray-200">Initiated</th>
                            <th class="border-gray-200">Transaction ID</th>
                            <th class="border-gray-200">Mode</th>						
                            <th class="border-gray-200">Shipment #</th>		
                            <th class="border-gray-200">Amount</th>
                            <th class="border-gray-200">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- Item --> */}
                        <tr>
                            <td>
                                <span class="fw-normal">
                                    <small>2022-02-24 04:22 PM <br/>5 months ago</small>
                                </span>
                            </td>
                            <td>
                                <a href="" data-bs-toggle="modal" data-bs-target="#modal-transporter-payout-transaction" class="fw-700 text-info">239723847</a>
                            </td>
                            <td>
                                <span class="fw-bold">PayPal </span><br/>
                                     <small>23984723847</small>
                            </td>
                            <td>
                                <a href="" class="fw-700 text-info">23984723847</a>
                            </td>                      
                            <td>
                                <span class="fw-bold text-danger">
                                    200.00 USD
                                </span> <br/>
                                <small>
                                    $190.00 + $10.00
                                </small>
                            </td>
                            <td><span class="badge rounded-pill bg-success">Active</span></td>
                        </tr>
                                                    
                    </tbody>
                </table>
                <div class="card-footer px-3 border-0 d-flex flex-column flex-lg-row align-items-center justify-content-between">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination mb-0">
                            <li class="page-item">
                                <a class="page-link" href="#">Previous</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">1</a>
                            </li>
                            <li class="page-item active">
                                <a class="page-link" href="#">2</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">3</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">4</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">5</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">Next</a>
                            </li>
                        </ul>
                    </nav>
                    <div class="fw-normal small mt-4 mt-lg-0">Showing <b>5</b> out of <b>25</b> entries</div>
                </div>
            </div> 
                    

    </section>
            </div>
        </div>
    </div>
  )
}

export default Transporter_wallet