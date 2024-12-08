import React, { Component } from "react";
import styles from "./SliderComponent.module.css";

class SliderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderData: [],
      counter: 0,
    };
  }

  componentDidMount() {
    fetch("/sliderData.json")
      .then((res) => res.json())
      .then((data) => this.setState({ sliderData: data }))
      .catch((error) => console.log("error", error));
  }

  nextSlide = () => {
    const { counter, sliderData } = this.state;
    counter === sliderData.length
      ? this.setState({ counter: 1 })
      : this.setState({ counter: (counter + 1) % sliderData.length });
  };

  prevSlide = () => {
    const { counter, sliderData } = this.state;
    if (counter > 0) {
      this.setState({
        counter: counter - 1,
      });
    } else {
      this.setState({
        counter: 4,
      });
    }
    // this.setState({
    //   counter: counter > 0 ? counter - 1 : 4
    // })
  };

  render() {
    const { sliderData, counter } = this.state;

    if (sliderData.length === 0) {
      return <p>Loading...</p>;
    }

    return (
      <article key={sliderData[counter].id} className={styles.sliderArticle}>
        <div className={styles.btnDiv}>
          <button onClick={this.prevSlide}>←</button>
          <button onClick={this.nextSlide}>→</button>
        </div>
        <img
          className={styles.img}
          src={sliderData[counter].img}
          alt={sliderData[counter].name}
        />
        <h3 className={styles.name}>{sliderData[counter].name}</h3>
        <p className={styles.info}>{sliderData[counter].info}</p>
      </article>
    );
  }
}

export default SliderComponent;
