import classnames from "classnames";
import styles from "./LoadingIcon.module.css";

export interface LoadingIconProps {
  className?: string;
}

export const LoadingIcon = ({ className }: LoadingIconProps) => {
  return (
    <div className={classnames(styles["lds-roller"], className)}>
      <div className="after:bg-blue-800"></div>
      <div className="after:bg-blue-800"></div>
      <div className="after:bg-blue-800"></div>
      <div className="after:bg-blue-800"></div>
      <div className="after:bg-blue-800"></div>
      <div className="after:bg-blue-800"></div>
      <div className="after:bg-blue-800"></div>
      <div className="after:bg-blue-800"></div>
    </div>
  );
};

export default LoadingIcon;
