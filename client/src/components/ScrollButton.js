import React, { useState, useCallback } from 'react';
import { Button, Icon } from 'semantic-ui-react';

class ScrollButton extends React.Component {
	constructor() {
		super();

		this.state = {
			intervalId: 0
		};
	}

	scrollStep() {
		if (window.pageYOffset === 0) {
			clearInterval(this.state.intervalId);
		}
		window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
	}

	scrollToTop() {
		let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
		this.setState({ intervalId: intervalId });
	}

	render() {
		return (
			<Button
				className="scroll"
				color="blue"
				onClick={() => {
					this.scrollToTop();
				}}
			>
				<Icon
					name="arrow alternate circle up outline"
					style={{ opacity: 1, fontSize: '2em', marginLeft: -15, height: '1em' }}
				/>
			</Button>
		);
	}
}

export default ScrollButton;
