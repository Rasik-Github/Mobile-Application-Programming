$(document).ready(function () {
    // Hamburger menu toggle
    $(".hamburger-menu").click(function() {
        $("nav").toggleClass("active");
        
        // Animate hamburger menu
        $(this).toggleClass("open");
        if($(this).hasClass("open")) {
            $(".bar:nth-child(1)").css({"transform": "rotate(-45deg) translate(-5px, 6px)"});
            $(".bar:nth-child(2)").css({"opacity": "0"});
            $(".bar:nth-child(3)").css({"transform": "rotate(45deg) translate(-5px, -6px)"});
        } else {
            $(".bar").css({"transform": "none", "opacity": "1"});
        }
    });

    // Close mobile menu when clicking a link
    $("nav ul li a").click(function() {
        if(window.innerWidth < 992) {
            $("nav").removeClass("active");
            $(".hamburger-menu").removeClass("open");
            $(".bar").css({"transform": "none", "opacity": "1"});
        }
    });

    // Booking form submission
    $("#bookingForm").submit(function (event) {
        event.preventDefault();
        $("#bookingForm button").html('<i class="fas fa-spinner fa-spin"></i> Processing...');
        
        setTimeout(function() {
            alert("🚚 Cargo booked successfully!");
            $("#bookingForm")[0].reset();
            $("#bookingForm button").html('<i class="fas fa-paper-plane"></i> Submit Booking');
        }, 1000);
    });

    // Login form submission
    $("#loginForm").submit(function (event) {
        event.preventDefault();
        $("#loginForm button").html('<i class="fas fa-spinner fa-spin"></i> Logging in...');
        
        setTimeout(function() {
            alert("✅ Login successful!");
            window.location.href = "index.html";
        }, 1000);
    });
    
    // Tracking form
    $(".tracking-form button").click(function() {
        const trackingNumber = $("#trackingNumber").val();
        if (trackingNumber) {
            $(this).html('<i class="fas fa-spinner fa-spin"></i> Tracking...');
            
            setTimeout(function() {
                // Show more detailed tracking information
                $(".tracking-form").append(`
                    <div class="tracking-result">
                        <h3>Tracking Information for #${trackingNumber}</h3>
                        <div class="tracking-timeline">
                            <div class="timeline-item complete">
                                <div class="timeline-icon"><i class="fas fa-check-circle"></i></div>
                                <div class="timeline-content">
                                    <h4>Order Received</h4>
                                    <p>March 22, 2025 - 10:30 AM</p>
                                </div>
                            </div>
                            <div class="timeline-item complete">
                                <div class="timeline-icon"><i class="fas fa-check-circle"></i></div>
                                <div class="timeline-content">
                                    <h4>Shipment Processed</h4>
                                    <p>March 22, 2025 - 2:45 PM</p>
                                </div>
                            </div>
                            <div class="timeline-item active">
                                <div class="timeline-icon"><i class="fas fa-truck"></i></div>
                                <div class="timeline-content">
                                    <h4>In Transit</h4>
                                    <p>March 23, 2025 - 9:15 AM</p>
                                </div>
                            </div>
                            <div class="timeline-item">
                                <div class="timeline-icon"><i class="fas fa-warehouse"></i></div>
                                <div class="timeline-content">
                                    <h4>Arriving at Destination</h4>
                                    <p>Estimated: March 24, 2025</p>
                                </div>
                            </div>
                            <div class="timeline-item">
                                <div class="timeline-icon"><i class="fas fa-home"></i></div>
                                <div class="timeline-content">
                                    <h4>Delivered</h4>
                                    <p>Pending</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
                
                $(".tracking-form button").html('<i class="fas fa-search"></i> Track Again');
            }, 1000);
        } else {
            alert("⚠️ Please enter a tracking number");
        }
    });

    // Add smooth scrolling to all links
    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                window.location.hash = hash;
            });
        }
    });

    // Add animation to cards when scrolling
    $(window).scroll(function() {
        $(".card, .service").each(function() {
            var position = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            
            if (scroll > position - windowHeight + 100) {
                $(this).addClass("animate");
            }
        });
    });
});

// Additional CSS for the tracking timeline (add to your styles.css)
// .tracking-result {
//     margin-top: 2rem;
//     padding: 1.5rem;
//     background: #f8f9fa;
//     border-radius: 10px;
// }
// .tracking-timeline {
//     position: relative;
//     margin-top: 2rem;
// }
// .timeline-item {
//     padding: 1rem 0 1rem 2.5rem;
//     position: relative;
//     border-left: 2px solid #ddd;
//     margin-left: 1rem;
// }
// .timeline-item:last-child {
//     border-left: 2px solid transparent;
// }
// .timeline-icon {
//     position: absolute;
//     left: -1rem;
//     top: 1rem;
//     width: 2rem;
//     height: 2rem;
//     border-radius: 50%;
//     background: white;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     box-shadow: 0 0 0 4px #f8f9fa;
// }
// .timeline-item.complete .timeline-icon {
//     color: #28a745;
// }
// .timeline-item.active .timeline-icon {
//     color: #007bff;
// }
// .timeline-content h4 {
//     margin-bottom: 0.25rem;
// }
// .timeline-item.complete {
//     border-left-color: #28a745;
// }
// .timeline-item.active {
//     border-left-color: #007bff;
// }