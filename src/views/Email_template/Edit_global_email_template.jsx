import React from 'react'
import Left_panel from '../Left_panel'
import Sub_header from '../Sub_header'

const Edit_global_email_template = () => {
  return (
    <div>
        <div className='row'>
            <div className="col-3">
                <Left_panel value={13}/>
            </div>
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
                            <li class="breadcrumb-item active" aria-current="page">Email Templates</li>
                        </ol>
                    </nav>
                    <h2 class="h4">Global Email Template</h2>
                    </div>
                <div class="btn-toolbar mb-2 mb-md-0">
                    
                </div>
            </div>
            
    </section>

    
    <section id="generalinfo">
        <div class="row">
            <div class="col-12 col-xl-8">
                <div class="card card-body border-0 shadow mb-4">
                    <form>
                        <div class="row">
                            <div class="col-sm-12 mb-3">
                                <div class="form-group">
                                    <label for="address">Sender Email</label>
                                    <input class="form-control" id="address" type="password" placeholder="Sender email eg: noreply@domain.com" autocomplete="new-password"/>
                                </div>
                            </div>
                            <div class="col-sm-12 mb-3">
                                <div class="form-group">
                                    <label for="address">Email Template</label>
                                    <div id="editor"></div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-3">
                            <button class="btn btn-gray-800 mt-2 animate-up-2" type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="col-12 col-xl-4">
                <div class="card card-body border-0 shadow mb-4">
                    <form>
                        <div class="row">
                            <h4>Shortcodes</h4>
                            <hr/>
                            <table class="table">
                                <thead>
                                  <tr>
                                    <th>Shortcode</th>
                                    <th>Use</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td><span class="badge rounded-pill bg-info fs-6 p-2">(fullname)</span></td>
                                    <td>For full user name </td>
                                  </tr>
                                  <tr>
                                    <td><span class="badge rounded-pill bg-info fs-6 p-2">(message)</span></td>
                                    <td>Message <br/>(fetch from other templates) </td>
                                  </tr>
                                </tbody>
                              </table>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>


            </div>
        </div>
    </div>
  )
}

export default Edit_global_email_template