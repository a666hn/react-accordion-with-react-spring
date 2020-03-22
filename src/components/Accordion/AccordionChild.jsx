import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ChevronDown } from "react-feather";

import { animated, useSpring } from "react-spring";

import "./style.scss";

let AccordionChild = props => {
  const defaultHeight = 50;

  const [height, setHeight] = useState(defaultHeight);
  const { isOpen, label, onClick, children } = props;
  const nodeRef = useRef(null);

  const animatedAccordion = useSpring({
    height: isOpen ? `${height + defaultHeight}px` : `${defaultHeight}px`
  });

  const animatedChevron = useSpring({
    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
  });

  useEffect(() => {
    // copy ref into new variable to remove side effect
    const isNode = nodeRef.current;

    // check ref
    if (nodeRef.current) {
      // get height element from ref
      setHeight(isNode.offsetHeight);
      window.addEventListener("resize", setHeight(isNode.offsetHeight));
    }

    // cleanup side effect
    return () =>
      window.removeEventListener("resize", setHeight(isNode.offsetHeight));
  }, []);

  return (
    <animated.div className="Accordion" style={animatedAccordion}>
      <div className="Accordion_Header" onClick={onClick}>
        <span className="Accordion_Label">{label}</span>{" "}
        <animated.span style={animatedChevron}>
          <ChevronDown size={12} />
        </animated.span>
      </div>
      <div ref={nodeRef} className="Accordion_Body">
        {children}
      </div>
    </animated.div>
  );
};

AccordionChild.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.instanceOf(Object).isRequired
};

export default AccordionChild;
