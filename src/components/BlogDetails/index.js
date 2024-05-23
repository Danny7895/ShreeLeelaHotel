import React from 'react';
import { Link } from 'react-router-dom'
import blog3 from '../../images/blog-details/comments-author/img-1.jpg'
import blog4 from '../../images/blog-details/comments-author/img-2.jpg'
import blog5 from '../../images/blog-details/comments-author/img-3.jpg'
import blog6 from '../../images/blog-details/author.jpg'
import gl1 from '../../images/blog/img-7.jpg'
import gl2 from '../../images/blog/img-8.jpg'
import blogs from '../../api/blogs';
import { useParams } from 'react-router-dom'
import BlogSidebar from '../../components/BlogSidebar'

const BlogSingle = (props) => {

    const { id } = useParams()

    const BlogDetails = blogs.find(item => item.id === id)

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <section className="wpo-blog-single-section section-padding">
            <div className="container">
                <div className="row">
                    <div className={`col col-lg-8 col-12 ${props.blRight}`}>
                        <div className="wpo-blog-content">
                            <div className="post format-standard-image">
                                <div className="entry-media">
                                    <img src={BlogDetails.blogSingleImg} alt="" />
                                </div>
                                <div className="entry-meta">
                                    <ul>
                                        <li><i className="fi flaticon-user"></i> By <Link to="/blog-single/1">{BlogDetails.author}</Link> </li>
                                        <li><i className="fi flaticon-comment-white-oval-bubble"></i> Comments {BlogDetails.comment}</li>
                                        <li><i className="fi flaticon-calendar"></i> {BlogDetails.create_at}</li>
                                    </ul>
                                </div>
                                <h2>{BlogDetails.title}</h2>
                                <p>Dubai is a city of superlatives, known for its ultra-modern architecture, luxurious shopping, vibrant nightlife, and cultural diversity. </p>
                                <blockquote>
                                When visiting Dubai, there are several must-see attractions that capture the essence of this dynamic metropolis:
                                </blockquote>
                                <h2>1. Burj Khalifa</h2>
            <p>The Burj Khalifa is the tallest building in the world, standing at an impressive 828 meters. A visit to the observation decks on the 124th and 148th floors offers breathtaking panoramic views of the city and beyond. The structure itself is an architectural marvel, and the evening fountain show at its base adds to its allure.</p>

            <h2>2. Dubai Mall</h2>
            <p>Located next to the Burj Khalifa, Dubai Mall is one of the largest shopping malls in the world. It's not just a shopping destination but also an entertainment hub. The mall features an indoor ice rink, an aquarium and underwater zoo, and countless dining options. The Dubai Fountain, located just outside, performs spectacular water and light shows daily.</p>

            <h2>3. Palm Jumeirah</h2>
            <p>This iconic man-made island is shaped like a palm tree and is home to luxurious hotels, upscale residences, and a variety of attractions. The Atlantis, The Palm resort is particularly notable, offering a water park, an aquarium, and fine dining options. A monorail ride provides stunning views of the island and the Dubai skyline.</p>

            <h2>4. Dubai Marina</h2>
            <p>Dubai Marina is a modern district known for its impressive skyline, luxurious lifestyle, and vibrant nightlife. Visitors can enjoy a leisurely stroll along the Marina Walk, dine at waterfront restaurants, or take a boat tour to see the stunning architecture from the water. The area also features the Dubai Marina Mall and numerous entertainment options.</p>

            <h2>5. The Dubai Frame</h2>
            <p>The Dubai Frame is a unique architectural landmark that offers a striking view of both old and new Dubai. Standing 150 meters high, it provides a picture-perfect frame of the city. The structure features an exhibition on Dubai's transformation from a fishing village to a global city and a sky deck with a glass floor that offers a thrilling perspective of the ground below.</p>

            <h2>6. Desert Safari</h2>
            <p>A desert safari is a quintessential Dubai experience. Visitors can take a thrilling dune bashing ride, enjoy camel rides, and witness a traditional Bedouin camp setup. The experience often includes cultural performances such as belly dancing and Tanoura shows, along with a barbecue dinner under the stars.</p>

            <h2>7. Dubai Creek and Al Fahidi Historical Neighborhood</h2>
            <p>For a glimpse into Dubai's past, visit the Al Fahidi Historical Neighborhood (also known as Al Bastakiya) and Dubai Creek. The area features traditional wind-tower architecture, museums, art galleries, and cafes. A ride on an abra (traditional wooden boat) across Dubai Creek offers a charming view of the city’s historic trading hub.</p>

            <h2>8. Jumeirah Beach and Burj Al Arab</h2>
            <p>Jumeirah Beach is a popular spot for relaxation and water activities. It offers beautiful views of the Arabian Gulf and the iconic Burj Al Arab, a luxury hotel designed to resemble a billowing sail. The nearby Jumeirah Beach Hotel and Wild Wadi Water Park add to the appeal of this area.</p>

            <h2>9. Dubai Opera</h2>
            <p>For those interested in the performing arts, Dubai Opera is a must-visit. This architectural masterpiece hosts a variety of performances, including opera, ballet, concerts, and theater. Its dhow-shaped design pays homage to Dubai’s maritime history.</p>

            <h2>10. Global Village</h2>
            <p>Global Village is a seasonal cultural and entertainment destination that showcases pavilions from countries around the world. Visitors can enjoy cultural shows, shop for unique products, and taste international cuisine. The vibrant atmosphere and diverse offerings make it a favorite for both locals and tourists.</p>

            <h2>Conclusion</h2>
            <p>Dubai offers a rich blend of modernity and tradition, making it a fascinating destination for travelers. From towering skyscrapers and luxurious shopping malls to historical neighborhoods and thrilling desert adventures, there is something for everyone in this vibrant city.</p>
        
                      
                                {/* <div className="gallery">
                                    <div>
                                        <img src={gl1} alt="" />
                                    </div>
                                    <div>
                                        <img src={gl2} alt="" />
                                    </div>
                                </div> */}
                            </div>

                            <div className="tag-share clearfix">
                                <div className="tag">
                                    <span>Share: </span>
                                    <ul>
                                        <li><Link to="/blog-single/1">Destination</Link></li>
                                        <li><Link to="/blog-single/1">Travelling</Link></li>
                                        <li><Link to="/blog-single/1">World Tour</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="tag-share-s2 clearfix">
                                <div className="tag">
                                    <span>Share: </span>
                                    <ul>
                                        <li><Link to="/blog-single/1">facebook</Link></li>
                                        <li><Link to="/blog-single/1">twitter</Link></li>
                                        <li><Link to="/blog-single/1">linkedin</Link></li>
                                        <li><Link to="/blog-single/1">pinterest</Link></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="author-box">
                                {/* <div className="author-avatar">
                                    <Link to="/blog-single/1" target="_blank"><img src={blog6} alt="" /></Link>
                                </div> */}
                                <div className="author-content">
                                    <Link to="/blog-single/1" className="author-name">Author: NISHA VERMA</Link>
                                    {/* <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.</p> */}
                                    {/* <div className="socials">
                                        <ul className="social-link">
                                            <li><Link to="/blog-single/1"><i className="ti-facebook"></i></Link></li>
                                            <li><Link to="/blog-single/1"><i className="ti-twitter-alt"></i></Link></li>
                                            <li><Link to="/blog-single/1"><i className="ti-linkedin"></i></Link></li>
                                            <li><Link to="/blog-single/1"><i className="ti-instagram"></i></Link></li>
                                        </ul>
                                    </div> */}
                                </div>
                            </div>

                            {/* <div className="more-posts">
                                <div className="previous-post">
                                    <Link to="/blog">
                                        <span className="post-control-link">Previous Post</span>
                                        <span className="post-name">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.</span>
                                    </Link>
                                </div>
                                <div className="next-post">
                                    <Link to="/blog-left-sidebar">
                                        <span className="post-control-link">Next Post</span>
                                        <span className="post-name">Dignissimos ducimus qui blanditiis praesentiu deleniti atque corrupti quos dolores</span>
                                    </Link>
                                </div>
                            </div> */}

                            <div className="comments-area">
                                <div className="comments-section">
                                    <h3 className="comments-title">Comments</h3>
                                    <ol className="comments">
                                        <li className="comment even thread-even depth-1" id="comment-1">
                                            <div id="div-comment-1">
                                                <div className="comment-theme">
                                                    <div className="comment-image"><img src={blog3} alt="" /></div>
                                                </div>
                                                <div className="comment-main-area">
                                                    <div className="comment-wrapper">
                                                        <div className="comments-meta">
                                                            <h4>DEEPAK KUMAR <span className="comments-date">January 12,2024
                                                                At 9.00am</span></h4>
                                                        </div>
                                                        <div className="comment-area">
                                                            <p>I will give you a complete account of the system, and
                                                                expound the actual teachings of the great explorer of
                                                                the truth, </p>
                                                            <div className="comments-reply">
                                                                <Link className="comment-reply-link" to="/blog-single/1"><span>Reply</span></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <ul className="children">
                                                <li className="comment">
                                                    <div>
                                                        <div className="comment-theme">
                                                            <div className="comment-image"><img src={blog4} alt="" /></div>
                                                        </div>
                                                        <div className="comment-main-area">
                                                            <div className="comment-wrapper">
                                                                <div className="comments-meta">
                                                                    <h4>DEEPAK KUMAR <span className="comments-date">January
                                                                        12,2024 At 9.00am</span></h4>
                                                                </div>
                                                                <div className="comment-area">
                                                                    <p>I will give you a complete account of the system,
                                                                        and expound the actual teachings of the great
                                                                        explorer of the truth, </p>
                                                                    <div className="comments-reply">
                                                                        <Link className="comment-reply-link" to="/blog-single/1"><span>Reply</span></Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ul>
                                                        <li className="comment">
                                                            <div>
                                                                <div className="comment-theme">
                                                                    <div className="comment-image"><img src={blog5} alt="" /></div>
                                                                </div>
                                                                <div className="comment-main-area">
                                                                    <div className="comment-wrapper">
                                                                        <div className="comments-meta">
                                                                            <h4>John Abraham <span className="comments-date">January
                                                                                12,2022 At 9.00am</span></h4>
                                                                        </div>
                                                                        <div className="comment-area">
                                                                            <p>I will give you a complete account of the
                                                                                system, and expound the actual teachings
                                                                                of the great explorer of the truth, </p>
                                                                            <div className="comments-reply">
                                                                                <Link className="comment-reply-link" to="/blog-single/1"><span>Reply</span></Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul> */}
                                        </li>
                                        <li className="comment">
                                            {/* <div>
                                                <div className="comment-theme">
                                                    <div className="comment-image"><img src={blog3} alt="" /></div>
                                                </div>
                                                <div className="comment-main-area">
                                                    <div className="comment-wrapper">
                                                        <div className="comments-meta">
                                                            <h4>DEEPAK KUMAR<span className="comments-date">January 12,2024
                                                                At 9.00am</span></h4>
                                                        </div>
                                                        <div className="comment-area">
                                                            <p>I will give you a complete account of the system, and
                                                                expound the actual teachings of the great explorer of
                                                                the truth, </p>
                                                            <div className="comments-reply">
                                                                <Link className="comment-reply-link" to="/blog-single/1"><span>Reply</span></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </li>
                                    </ol>
                                </div>
                                <div className="comment-respond">
                                    <h3 className="comment-reply-title">Post Comments</h3>
                                    <form onSubmit={submitHandler} id="commentform" className="comment-form">
                                        <div className="form-textarea">
                                            <textarea id="comment" placeholder="Write Your Comments..."></textarea>
                                        </div>
                                        <div className="form-inputs">
                                            <input placeholder="Website" type="url" />
                                            <input placeholder="Name" type="text" />
                                            <input placeholder="Email" type="email" />
                                        </div>
                                        <div className="form-submit">
                                            <input id="submit" value="Post Comment" type="submit" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <BlogSidebar blLeft={props.blLeft}/>
                </div>
            </div>
        </section>
    )

}

export default BlogSingle;
