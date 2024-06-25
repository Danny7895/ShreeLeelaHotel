// src/pages/PrivacyPolicy.js

import React from 'react';
import './PrivacyPolicy.css'; // Optional: Import a CSS file for styling if needed
import { Link } from 'react-router-dom';
const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy">
            <h1 style={{textAlign:'center', color:'#fb2424'}}>Privacy Policy</h1>
            <br></br>

            <section>
                <h2>SECTION 1 - WHAT DO WE DO WITH YOUR INFORMATION?</h2>
                <p>
                    When you book a room at Shree Leela Hotel and Restaurant, as part of the booking process, we collect the personal information you give us such as your name, phone number, address, and email address.
                </p>
                <p>
                    When you browse our website, we also automatically receive your computer’s internet protocol (IP) address to provide us with information that helps us learn about your browser and operating system.
                </p>
                <p>
                    Email marketing (if applicable): With your permission, we may send you emails about our hotel, new offers, and other updates.
                </p>
            </section>

            <section>
                <h2>SECTION 2 - CONSENT</h2>
                <h3>How do you get my consent?</h3>
                <p>
                    When you provide us with personal information to complete a booking, we imply that you consent to our collecting it and using it for that specific reason only.
                </p>
                <p>
                    If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent or provide you with an opportunity to say no.
                </p>
                <h3>How do I withdraw my consent?</h3>
                <p>
                    If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use, or disclosure of your information, at any time, by contacting us at <a href="mailto:shrileelahotelresorts@gmail.com">shrileelahotelresorts@gmail.com</a> or mailing us at: Shree Leela Hotel and Restaurant, 622 Manglam Electronic Market, Jaipur, Rajasthan, India, 302001.
                </p>
            </section>

            <section>
                <h2>SECTION 3 - DISCLOSURE</h2>
                <p>
                    We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.
                </p>
            </section>

            <section>
                <h2>SECTION 4 - PAYMENT</h2>
                <p>
                    We use Razorpay for processing payments. We/Razorpay do not store your card data on their servers. The data is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS) when processing payment. Your purchase transaction data is only used as long as necessary to complete your purchase transaction. After that is complete, your purchase transaction information is not saved.
                </p>
                <p>
                    Our payment gateway adheres to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, MasterCard, American Express, and Discover.
                </p>
                <p>
                    PCI-DSS requirements help ensure the secure handling of credit card information by our store and its service providers.
                </p>
                <p>
                    For more insight, you may also want to read Razorpay's terms and conditions on <a href="https://razorpay.com">https://razorpay.com</a>.
                </p>
            </section>

            <section>
                <h2>SECTION 5 - THIRD-PARTY SERVICES</h2>
                <p>
                    In general, the third-party providers used by us will only collect, use, and disclose your information to the extent necessary to allow them to perform the services they provide to us.
                </p>
                <p>
                    However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies regarding the information we are required to provide to them for your purchase-related transactions.
                </p>
                <p>
                    For these providers, we recommend that you read their privacy policies so you can understand how your personal information will be handled by these providers.
                </p>
                <p>
                    In particular, remember that certain providers may be located in or have facilities that are located in a different jurisdiction than either you or us. So if you elect to proceed with a transaction that involves the services of a third-party service provider, then your information may become subject to the laws of the jurisdiction(s) in which that service provider or its facilities are located.
                </p>
                <p>
                    Once you leave our store’s website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website’s Terms of Service.
                </p>
                <p><strong>Links</strong></p>
                <p>
                    When you click on links on our site, they may direct you away from our site. We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements.
                </p>
            </section>

            <section>
                <h2>SECTION 6 - SECURITY</h2>
                <p>
                    To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered, or destroyed.
                </p>
            </section>

            <section>
                <h2>SECTION 7 - COOKIES</h2>
                <p>
                    We use cookies to maintain session of your user. It is not used to personally identify you on other websites.
                </p>
            </section>

            <section>
                <h2>SECTION 8 - AGE OF CONSENT</h2>
                <p>
                    By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
                </p>
            </section>

            <section>
                <h2>SECTION 9 - CHANGES TO THIS PRIVACY POLICY</h2>
                <p>
                    We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.
                </p>
                <p>
                    If our hotel is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.
                </p>
            </section>

            <section>
                <h2>QUESTIONS AND CONTACT INFORMATION</h2>
                <p>
                    If you would like to: access, correct, amend, or delete any personal information we have about you, register a complaint, or simply want more information, contact our Privacy Compliance Officer at <a href="mailto:shrileelahotelresorts@gmail.com">shrileelahotelresorts@gmail.com</a> or by contact no. and address below.
                </p>
                <p>Shree Leela Hotel and Restaurant<br/>
                42CH+63 RAJMARGH, BAS STAND CHOURAHA, <br/>LOLARI,
                Madhya Pradesh 487330
                </p>
                <p>contact no.</p><a href='tel:+918001234567'>+91 8001234567</a>
            </section>
          <br></br>
           
         <Link className='button' style={{color:'#fafafa',fontSize:'20px'}} to="/" >Back to Home</Link>
        </div>
    );
};

export default PrivacyPolicy;
