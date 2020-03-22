import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

import AccordionChild from "./AccordionChild";

let Accordion = props => {
  const { as, children } = props;
  const ElementTag = as ? as : "div";

  const [state, setState] = useState({
    active: {}
  });

  const onTriggerAccordion = label => {
    const { active } = state;
    const isOpen = !!active[label];

    setState(state => ({
      ...state,
      active: {
        [label]: !isOpen
      }
    }));
  };

  return (
    <ElementTag>
      {children.map((child, idx) => (
        <Fragment key={idx}>
          <AccordionChild
            onClick={() => onTriggerAccordion(child.props.id)}
            label={child.props.id}
            isOpen={!!state.active[child.props.id]}
          >
            {child.props.children}
          </AccordionChild>
        </Fragment>
      ))}
    </ElementTag>
  );
};

Accordion.propTypes = {
  as: PropTypes.oneOf(["div", "article", "section"]),
  children: PropTypes.array.isRequired
};

export default Accordion;
