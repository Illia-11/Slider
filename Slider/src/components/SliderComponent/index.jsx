import React, { Component } from "react";
import styles from "./SliderComponent.module.css";

class SliderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderData: [],
      currentImg: 0,
    };
  }

  componentDidMount() {
    fetch("/sliderData.json")
      .then((res) => res.json())
      .then((data) => this.setState({ sliderData: data }))
      .catch((error) => console.log("error", error));
  }

  nextSlide = () => {
    const { currentImg, sliderData } = this.state;
    const nextSlide = setTimeout(() => {
      currentImg === sliderData.length
        ? this.setState({ currentImg: 1 })
        : this.setState({ currentImg: (currentImg + 1) % sliderData.length });
    }, 500);
    this.setState({ nextSlide });
  };

  prevSlide = () => {
    const { currentImg } = this.state;
    const prevSlide = setTimeout(() => {
      currentImg > 0
        ? this.setState({ currentImg: currentImg - 1 })
        : this.setState({ currentImg: 4 });
    }, 500);
    this.setState({ prevSlide });
  };

  autoSwitcher = () => {
    const autoSwitcher = setInterval(() => {
      this.nextSlide();
    }, 4000);

    this.setState({
      autoSwitcher,
    });
  };

  stopAutoSwitcher = () => {
    const { autoSwitcher } = this.state;
    clearInterval(autoSwitcher);
    this.setState({
      autoSwitcher: null,
    });
  };

  render() {
    const { sliderData, currentImg } = this.state;

    if (sliderData.length === 0) {
      return <p>Loading...</p>;
    }

    return (
      <article className={styles.sliderArticle}>
        <div className={styles.btnDiv}>
          <button
            className={styles.btnStyle}
            onClick={() => this.autoSwitcher()}
          >
            Auto switcher
          </button>
          <button
            className={styles.btnStyle}
            onClick={() => this.stopAutoSwitcher()}
          >
            Stop auto swithcer
          </button>
          <button className={styles.btnStyle} onClick={this.prevSlide}>
            ←
          </button>
          <p>Current page: {currentImg + 1}</p>
          <button className={styles.btnStyle} onClick={this.nextSlide}>
            →
          </button>
        </div>
        <img
          className={styles.img}
          src={sliderData[currentImg].img}
          alt={sliderData[currentImg].name}
        />
        <h3 className={styles.name}>{sliderData[currentImg].name}</h3>
        <p className={styles.info}>{sliderData[currentImg].info}</p>
      </article>
    );
  }
}

export default SliderComponent;
