import css from "./Phone.module.css";
import phoneImg from "@assets/images/iPhone1xDesc.webp";

export default function Phone() {
  return (
    <div className={css.phoneWrapper}>
      <img
        src={phoneImg}
        alt="Phone illustration"
        className={css.phoneImage}
        loading="lazy"
      />
    </div>
  );
}
