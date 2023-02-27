import { useEffect, useRef } from "react";

function RadarIcon() {
  const iconRef = useRef<SVGSVGElement>();

  useEffect(() => {
    function animateCenterRadar() {
      center.classList.toggle(animation);
    }
    function animateInRadar() {
      in1.classList.toggle(animation);
      in2.classList.toggle(animation);
    }
    function animateOutRadar() {
      out1.classList.toggle(animation);
      out2.classList.toggle(animation);
    }

    function handleCenterAnimationEnd() {
      animateCenterRadar();
      animateInRadar();
    }

    function handleInAnimationEnd() {
      animateInRadar();
      animateOutRadar();
    }

    function handleOutAnimationEnd() {
      animateCenterRadar();
      animateOutRadar();
    }

    const [center, out1, out2, in1, in2] = Object.values(
      iconRef.current.children
    ) as SVGPathElement[];

    const animation = "animate-[pulse_0.4s_ease-in-out]";

    center.addEventListener("animationend", handleCenterAnimationEnd);
    in1.addEventListener("animationend", handleInAnimationEnd);
    out1.addEventListener("animationend", handleOutAnimationEnd);

    return () => {
      center.removeEventListener("animationend", handleCenterAnimationEnd);
      in1.removeEventListener("animationend", handleInAnimationEnd);
      out1.removeEventListener("animationend", handleOutAnimationEnd);
    };
  }, []);

  return (
    <svg
      className="w-80 h-48"
      viewBox="0 9.5 24 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={iconRef}
    >
      <path
        d="M11.9991 14.3801C13.3136 14.3801 14.3792 13.3146 14.3792 12.0001C14.3792 10.6857 13.3136 9.62012 11.9991 9.62012C10.6847 9.62012 9.61914 10.6857 9.61914 12.0001C9.61914 13.3146 10.6847 14.3801 11.9991 14.3801Z"
        className="fill-blue-900 dark:fill-blue-200 animate-[pulse_0.4s_ease-in-out]"
      ></path>
      <path
        d="M20.0003 18.75C19.8403 18.75 19.6903 18.7 19.5503 18.6C19.2203 18.35 19.1503 17.88 19.4003 17.55C20.6103 15.94 21.2503 14.02 21.2503 12C21.2503 9.98004 20.6103 8.06005 19.4003 6.45005C19.1503 6.12005 19.2203 5.65003 19.5503 5.40003C19.8803 5.15003 20.3503 5.22002 20.6003 5.55002C22.0103 7.42002 22.7503 9.65004 22.7503 12C22.7503 14.35 22.0103 16.58 20.6003 18.45C20.4503 18.65 20.2303 18.75 20.0003 18.75Z"
        className="fill-gray-900 dark:fill-gray-500"
      ></path>
      <path
        d="M4 18.75C3.77 18.75 3.54999 18.65 3.39999 18.45C1.98999 16.58 1.25 14.35 1.25 12C1.25 9.65004 1.98999 7.42002 3.39999 5.55002C3.64999 5.22002 4.12001 5.15003 4.45001 5.40003C4.78001 5.65003 4.85001 6.12005 4.60001 6.45005C3.39001 8.06005 2.75 9.98004 2.75 12C2.75 14.02 3.39001 15.94 4.60001 17.55C4.85001 17.88 4.78001 18.35 4.45001 18.6C4.32001 18.7 4.16 18.75 4 18.75Z"
        className="fill-gray-900 dark:fill-gray-500"
      ></path>
      <path
        d="M16.7991 16.3499C16.6391 16.3499 16.4891 16.2999 16.3491 16.1999C16.0191 15.9499 15.9491 15.4799 16.1991 15.1499C16.8891 14.2399 17.2491 13.1499 17.2491 11.9999C17.2491 10.8499 16.8891 9.75994 16.1991 8.84994C15.9491 8.51994 16.0191 8.04992 16.3491 7.79992C16.6791 7.54992 17.1491 7.61995 17.3991 7.94995C18.2791 9.12995 18.7491 10.5299 18.7491 11.9999C18.7491 13.4699 18.2791 14.8799 17.3991 16.0499C17.2491 16.2499 17.0291 16.3499 16.7991 16.3499Z"
        className="fill-gray-900 dark:fill-gray-500"
      ></path>
      <path
        d="M7.20001 16.3499C6.97001 16.3499 6.75001 16.2499 6.60001 16.0499C5.72001 14.8699 5.25 13.4699 5.25 11.9999C5.25 10.5299 5.72001 9.11995 6.60001 7.94995C6.85001 7.61995 7.31999 7.54992 7.64999 7.79992C7.97999 8.04992 8.04999 8.51994 7.79999 8.84994C7.10999 9.75994 6.75 10.8499 6.75 11.9999C6.75 13.1499 7.10999 14.2399 7.79999 15.1499C8.04999 15.4799 7.97999 15.9499 7.64999 16.1999C7.51999 16.2999 7.36001 16.3499 7.20001 16.3499Z"
        className="fill-gray-900 dark:fill-gray-500"
      ></path>
    </svg>
  );
}

export default RadarIcon;
