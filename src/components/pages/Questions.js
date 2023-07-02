import Card from "../ui/Card";
import classes from "./Questions.module.css";
const Questions = () => {
  const title = `mt-5 ${classes.title}`;
  return (
    <section>
      <div className={title}>
        <h3  style={{color: "#29bfc2"}}> Frequently Asked Questions</h3>
      </div>
      <div className={title}>
        <h5  style={{color: "#29bfc2"}}>Booking</h5>
      </div>

      <Card>
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                Can I request a specific bed type?
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                Special requests are at the discretion of the hotel and subject
                to availability. Keep in mind that if available, there may be an
                extra charge payable directly to the hotel.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                Can you resend the booking confirmation to me?
              </button>
            </h2>
            <div
              id="flush-collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                If you cannot find the confirmed booking, our support team can
                resend the booking upon your request.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseThree"
                aria-expanded="false"
                aria-controls="flush-collapseThree"
              >
                How can I change the guest name after the booking confirmation?
              </button>
            </h2>
            <div
              id="flush-collapseThree"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                If you want to change the guest name , please contact our
                support team or property directly . But you have to show the
                booking confirmation status or confirm mail to our customer
                service team for changing or adding the guest name/ Group name.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseFour"
                aria-expanded="false"
                aria-controls="flush-collapseFour"
              >
                Why has the rate changed since my previous hotel search ?
              </button>
            </h2>
            <div
              id="flush-collapseFour"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                Hotel rates change all the time, generally based on availability
                and demand.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseFive"
                aria-expanded="false"
                aria-controls="flush-collapseFive"
              >
                What is the primary guest information?
              </button>
            </h2>
            <div
              id="flush-collapseFive"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                All the rooms will be held under the primary guest name you give
                during booking. The primary guest must be present when checking
                in to each room. Please note that it’s not possible to change
                any primary guest details like the guest's name or email address
                once you receive confirmation mail.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseSix"
                aria-expanded="false"
                aria-controls="flush-collapseSix"
              >
                How can I make a special request (early check in/out) and how
                will I know if this request is confirmed or not?
              </button>
            </h2>
            <div
              id="flush-collapseSix"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                All special requests are subject to availability and cannot be
                guaranteed by ShweBooking.com. We will forward your request to
                your preferred property upon availability, and you can follow up
                with the property before or upon arrival.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseSeven"
                aria-expanded="false"
                aria-controls="flush-collapseSeven"
              >
                Can I extend or shorten my stay?
              </button>
            </h2>
            <div
              id="flush-collapseSeven"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                You can extend additional stay depending on the availability of
                rooms .Make your new booking and choose your new additional
                dates. You also can contact our support team or property
                directly . If you shorten the booking , any cancellation fees
                are determined by the property and listed in your cancellation
                policy. Please note that not all bookings will allow changes to
                booking dates. You can extend additional stay depending on the
                availability of rooms .Make your new booking and choose your new
                additional dates. You also can contact our support team or
                property directly . If you shorten the booking , any
                cancellation fees are determined by the property and listed in
                your cancellation policy. Please note that not all bookings will
                allow changes to booking dates. You can extend additional stay
                depending on the availability of rooms .Make your new booking
                and choose your new additional dates. You also can contact our
                support team or property directly .
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className={title}>
        <h5  style={{color: "#29bfc2"}}>Payment</h5>
      </div>

      <Card>
        <div className="accordion accordion-flush" id="accordionFlushExample1">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseEight"
                aria-expanded="false"
                aria-controls="flush-collapseEight"
              >
                How do I make sure about the payment details and booking
                confirmation status?
              </button>
            </h2>
            <div
              id="flush-collapseEight"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample1"
            >
              <div className="accordion-body">
                You’ll receive your confirmation email or sms depending on the
                info you provided as the guest information after the booking is
                confirmed.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseNine"
                aria-expanded="false"
                aria-controls="flush-collapseNine"
              >
                I do not receive the booking confirmation message after payment?
                What should I do?
              </button>
            </h2>
            <div
              id="flush-collapseNine"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample1"
            >
              <div className="accordion-body">
                You’ll get a confirmation email once your booking is confirmed.
                This should only take about two minutes but sometimes can take
                longer. Check your spam/junk mail folders for this email. It may
                be there by mistake. If you still haven't received any emails,
                reach out to our Customer Service team.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTen"
                aria-expanded="false"
                aria-controls="flush-collapseTen"
              >
                Do prices include Taxes ?
              </button>
            </h2>
            <div
              id="flush-collapseTen"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample1"
            >
              <div className="accordion-body">
                Room charges on our Shwebooking.com include applicable
                commercial taxes.
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className={title}>
        <h5 style={{color: "#29bfc2"}}>Cancellation</h5>
      </div>

      <Card>
        <div className="accordion accordion-flush" id="accordionFlushExample2">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseEleven"
                aria-expanded="false"
                aria-controls="flush-collapseEleven"
              >
                Where can I find the cancellation policy?
              </button>
            </h2>
            <div
              id="flush-collapseEleven"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample2"
            >
              <div className="accordion-body">
                You should be able to find the booking conditions and the
                cancellation policy along with other room information while you
                are searching. You can also find this information on your
                booking voucher.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwelve"
                aria-expanded="false"
                aria-controls="flush-collapseTwelve"
              >
                Can I make changes or cancel my booking due to COVID-19?
              </button>
            </h2>
            <div
              id="flush-collapseTwelve"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample2"
            >
              <div className="accordion-body">
                Any changes you wish to make to your booking are dependent on
                the policies of your booking. Due to the ongoing impact of
                COVID-19, certain destinations continue to impose and modify
                restrictions on travel. Please check to see whether your
                destination has any travel restrictions prior.
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className={title}>
        <h5 style={{color: "#29bfc2"}}>Check-in</h5>
      </div>

      <Card>
        <div className="accordion accordion-flush" id="accordionFlushExample3">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseThirteen"
                aria-expanded="false"
                aria-controls="flush-collapseThirteen"
              >
                When can I check into my room?
              </button>
            </h2>
            <div
              id="flush-collapseThirteen"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample3"
            >
              <div className="accordion-body">
                Check-in times are listed on your reservation confirmation. The
                option to check in early or late is dependent on the hotel's
                policies and availability.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseFourteen"
                aria-expanded="false"
                aria-controls="flush-collapseFourteen"
              >
                What do I need to bring to the hotel for check in?
              </button>
            </h2>
            <div
              id="flush-collapseFourteen"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample3"
            >
              <div className="accordion-body">
                You will need the following when checking in to the hotel:
                Government-issued photo identification such as driver's license
                or passport, and booking confirmation reference/ mail.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseFifteen"
                aria-expanded="false"
                aria-controls="flush-collapseFifteen"
              >
                How can I get more information about the room or property's
                facility?
              </button>
            </h2>
            <div
              id="flush-collapseFifteen"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample3"
            >
              <div className="accordion-body">
                You can find details about the property in your confirmation
                email or on the property detail page. For anything else, you can
                also contact our customer service team or property directly.
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default Questions;
