import React from 'react'

const Models_pop = () => {
  return (
    <div>
        {/* <!-- Modal Content --> */}
<div class="modal fade" id="modal-transporter-payout" tabindex="-1" role="dialog" aria-labelledby="modal-transporter-payout" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="h6 modal-title">Transporter Payout</h2>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="row">
                        <div class="col-12">
                            <div class="mb-3">
                                <label for="email" class="form-label">Date</label>
                                <input type="date" class="form-control" id="email" placeholder="" name="email" />
                              </div>
                        </div>
                        <div class="col-12">
                            <div class="mb-3">
                                <label for="email" class="form-label">Shipment</label>
                                <select class="form-select">
                                    <option>1234234234</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                  </select>
                              </div>
                        </div>
                        <div class="col-12">
                            <div class="mb-3">
                                <label for="email" class="form-label">Mode</label>
                                <input type="text" class="form-control" id="email" placeholder="Enter Mode eg. Paypal, Bank etc." name="email" />
                              </div>
                        </div>
                        <div class="col-12">
                            <div class="mb-3">
                                <label for="email" class="form-label">Mode Transcation ID</label>
                                <input type="text" class="form-control" id="email" placeholder="Enter Mode eg. Paypal, Bank etc." name="email" />
                              </div>
                        </div>
                        <div class="col-12">
                            <div class="mb-3 text-end text-danger">
                                <h3>$200</h3>
                              </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary">Paid</button>
                <button type="button" class="btn btn-link text-gray-600 ms-auto" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
{/* <!-- End of Modal Content --> */}



    <section>
        {/* <!-- Modal Content --> */}
        <div class="modal fade" id="modal-transporter-payout-transaction" tabIndex="-1" role="dialog" aria-labelledby="modal-transporter-payout-transaction" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="h6 modal-title">Transaction #10923231923</h2>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table">
                            <tbody>
                              <tr>
                                <td class="fw-700 text-dark">Date</td>
                                <td>2022-02-24 04:22 PM</td>
                              </tr>
                              <tr>
                                <td class="fw-700 text-dark">Transaction ID</td>
                                <td>94V48BYCW7SS</td>
                              </tr>
                              <tr>
                                <td class="fw-700 text-dark">Mode</td>
                                <td>Paypal</td>
                              </tr>
                              <tr>
                                <td class="fw-700 text-dark">Amount</td>
                                <td>190</td>
                              </tr>
                              <tr>
                                <td class="fw-700 text-dark">Gateway Charges</td>
                                <td>10</td>
                              </tr>
                              <tr>
                                <td class="fw-700 text-dark">Total Paid</td>
                                <td>200</td>
                              </tr>
                            </tbody>
                          </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-link text-gray-600 ms-auto" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        {/* // <!-- End of Modal Content --> */}
    </section>


{/* // <!-- Master Price HELP Content --> */}
    <section>
        <div class="modal fade" id="modal-master-help" tabindex="-1" role="dialog" aria-labelledby="modal-master-help" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="h6 modal-title">Help</h2>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h4><i class="fa fa-angle-right" aria-hidden="true"></i> Booking admin commission</h4>
                        <p>This is admin commission which will be admin charged on confirmaing a shipemnt. When customer do the payment for booking confirmation, this fee will be added to the advnace amount and it will be charged from Transporter paid amount.
                        </p>
                        <hr/>
                        <h4><i class="fa fa-angle-right" aria-hidden="true"></i> Transporter Advance</h4>
                        <p>
                            Advance amount for transporter on booking
                        </p>
                        <hr/>
                        <h5>Example</h5>
                        <p>
                            <table class="table">
                                <thead>
                                  <tr>
                                    <th>Particluar</th>
                                    <th>Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Bid amount</td>
                                    <td>$1000</td>
                                  </tr>
                                  <tr>
                                    <td>Add: Transporter Advance (40%)</td>
                                    <td>$400</td>
                                  </tr>
                                  <tr>
                                    <td>Add: Booking admin commission (10%)</td>
                                    <td>$100</td>
                                  </tr>
                                  <tr>
                                    <td class="fw-700">Total Pay Amount for customer on booking</td>
                                    <td class="fw-700"><h6>$500</h6></td>
                                  </tr>
                                  <tr>
                                    <td>Balance TBP by customer</td>
                                    <td>$500</td>
                                  </tr>
                                </tbody>
                              </table>
                            <small class="text-muted">
                                For example customer confirm $1000 bid and Transporter Advance 40% and Booking admin commission is 10% then:
                            Customer will pay $500 ($400 transporter advance + $100 admin commission).
                            Rest $500 outstanding amount can be paid to transporter on delivery directly by the customer
                            </small>
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-link text-gray-600 ms-auto" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!-- Master Price HELP Content --> */}

   




{/* <!-- Add add_attribute --> */}
<section>
  <div class="modal fade" id="modal-add_attribute" tabindex="-1" role="dialog" aria-labelledby="modal-add_attribute" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h2 class="h6 modal-title">Add Attributes</h2>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <div class="mb-3">
                    <label for="email" class="form-label">Attribute Lable Name</label>
                    <input type="text" class="form-control" id="email" placeholder="Enter attribute heading" name="email"/>
                  </div>
                  <div class="d-grid">
                    <button type="button" class="btn btn-secondary btn-block">Add/Update</button>
                  </div>
              </div>
          </div>
      </div>
  </div>
</section>
{/* <!-- Add add_attribute --> */}



    </div>
  )
}

export default Models_pop