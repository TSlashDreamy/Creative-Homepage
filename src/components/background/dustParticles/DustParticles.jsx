import Particles from "react-tsparticles";
import style from "./particles.module.css";

const DustParticles = () => {
  return (
    <Particles
      className={style.particles}
      options={{
        fullScreen: true,
        autoPlay: true,
        background: {
          image: "",
          position: "50% 50%",
          repeat: "no-repeat",
          size: "cover",
          opacity: 0,
        },
        backgroundMask: {
          composite: "destination-out",
          cover: {
            color: {
              value: "#fff",
            },
            opacity: 1,
          },
          enable: false,
        },
        backgroundMode: {
          enable: false,
          zIndex: 0,
        },
        detectRetina: false,
        fpsLimit: 60,
        infection: {
          cure: false,
          delay: 2,
          enable: false,
          infections: 0,
          stages: [],
        },
        interactivity: {
          detectsOn: "canvas",
          events: {
            onClick: {
              enable: false,
              mode: "bubble",
            },
            onDiv: {
              selectors: [],
              enable: false,
              mode: [],
              type: "circle",
            },
            onHover: {
              enable: true,
              mode: "slow",
              parallax: {
                enable: false,
                force: 10,
                smooth: 20,
              },
            },
            resize: true,
          },
          modes: {
            attract: {
              distance: 200,
              duration: 0.4,
              speed: 1,
            },
            bounce: {
              distance: 200,
            },
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            connect: {
              distance: 80,
              links: {
                opacity: 0.5,
              },
              radius: 60,
            },
            grab: {
              distance: 400,
              links: {
                blink: false,
                consent: false,
                opacity: 1,
              },
            },
            light: {
              area: {
                gradient: {
                  start: {
                    value: "#ffffff",
                  },
                  stop: {
                    value: "#000000",
                  },
                },
                radius: 1000,
              },
              shadow: {
                color: {
                  value: "#000000",
                },
                length: 2000,
              },
            },
            push: {
              quantity: 4,
            },
            remove: {
              quantity: 2,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
              speed: 1,
            },
            slow: {
              factor: 3,
              radius: 200,
            },
            trail: {
              delay: 1,
              quantity: 1,
              particles: {
                bounce: {
                  horizontal: {
                    random: {},
                  },
                  vertical: {
                    random: {},
                  },
                },
                collisions: {
                  bounce: {
                    horizontal: {
                      random: {},
                    },
                    vertical: {
                      random: {},
                    },
                  },
                },
                color: {
                  animation: {},
                },
                life: {
                  delay: {
                    random: {},
                  },
                  duration: {
                    random: {},
                  },
                },
                links: {
                  shadow: {},
                  triangles: {},
                },
                move: {
                  angle: {},
                  attract: {
                    rotate: {},
                  },
                  gravity: {},
                  noise: {
                    delay: {
                      random: {},
                    },
                  },
                  outModes: {},
                  trail: {},
                },
                number: {
                  density: {},
                },
                opacity: {
                  animation: {},
                  random: {},
                },
                rotate: {
                  animation: {},
                },
                shadow: {
                  offset: {},
                },
                shape: {},
                size: {
                  animation: {},
                  random: {},
                },
                stroke: {
                  color: {
                    value: "",
                    animation: {
                      enable: false,
                      speed: 0,
                      sync: false,
                    },
                  },
                },
                twinkle: {
                  lines: {},
                  particles: {},
                },
              },
            },
          },
        },
        manualParticles: [],
        motion: {
          disable: true,
          reduce: {
            factor: 5,
            value: true,
          },
        },
        particles: {
          bounce: {
            horizontal: {
              random: {
                enable: false,
                minimumValue: 0.1,
              },
              value: 1,
            },
            vertical: {
              random: {
                enable: false,
                minimumValue: 0.1,
              },
              value: 1,
            },
          },
          collisions: {
            bounce: {
              horizontal: {
                random: {
                  enable: false,
                  minimumValue: 0.1,
                },
                value: 1,
              },
              vertical: {
                random: {
                  enable: false,
                  minimumValue: 0.1,
                },
                value: 1,
              },
            },
            enable: false,
            mode: "bounce",
          },
          color: {
            value: "#b3b3b3",
            animation: {
              enable: false,
              speed: 20,
              sync: true,
            },
          },
          life: {
            count: 0,
            delay: {
              random: {
                enable: false,
                minimumValue: 0,
              },
              value: 0,
              sync: false,
            },
            duration: {
              random: {
                enable: false,
                minimumValue: 0.0001,
              },
              value: 0,
              sync: false,
            },
          },
          links: {
            blink: false,
            color: {
              value: "#ffffff",
            },
            consent: false,
            distance: 100,
            enable: false,
            frequency: 1,
            opacity: 0.4,
            shadow: {
              blur: 5,
              color: {
                value: "#00ff00",
              },
              enable: false,
            },
            triangles: {
              enable: false,
              frequency: 1,
            },
            width: 1,
            warp: false,
          },
          move: {
            angle: {
              offset: 185,
              value: 120,
            },
            attract: {
              enable: false,
              rotate: {
                x: 600,
                y: 1200,
              },
            },
            direction: "bottom",
            distance: 0,
            enable: true,
            gravity: {
              acceleration: 9.81,
              enable: false,
              maxSpeed: 50,
            },
            noise: {
              delay: {
                random: {
                  enable: false,
                  minimumValue: 0,
                },
                value: 0,
              },
              enable: false,
            },
            outModes: {
              default: "out",
              bottom: "out",
              left: "out",
              right: "out",
              top: "out",
            },
            random: true,
            size: true,
            speed: 2,
            straight: false,
            trail: {
              enable: false,
              length: 10,
              fillColor: {
                value: "#000000",
              },
            },
            vibrate: false,
            warp: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
              factor: 1000,
            },
            limit: 0,
            value: 80,
          },
          opacity: {
            random: {
              enable: true,
              minimumValue: 0.1,
            },
            value: 0.5,
            animation: {
              enable: true,
              minimumValue: 0.1,
              speed: 1,
              sync: false,
            },
          },
          reduceDuplicates: false,
          rotate: {
            random: {
              enable: false,
              minimumValue: 0,
            },
            value: 0,
            animation: {
              enable: false,
              speed: 0,
              sync: false,
            },
            direction: "bottom",
            path: false,
          },
          shadow: {
            blur: 0,
            color: {
              value: "#000000",
            },
            enable: false,
            offset: {
              x: 0,
              y: 0,
            },
          },
          shape: {
            options: {
              polygon: {
                sides: 5,
              },
              image: {
                src: "https://cdn.matteobruni.it/images/particles/github.svg",
                width: 100,
                height: 100,
              },
            },
            type: "circle",
          },
          size: {
            random: {
              enable: true,
              minimumValue: 1,
            },
            value: 4,
            animation: {
              destroy: "none",
              enable: true,
              minimumValue: 0.1,
              speed: 1,
              startValue: "random",
              sync: false,
            },
          },
          stroke: {
            width: 0,
            color: {
              value: "",
              animation: {
                enable: false,
                speed: 0,
                sync: false,
              },
            },
          },
          twinkle: {
            lines: {
              enable: false,
              frequency: 0.05,
              opacity: 1,
            },
            particles: {
              enable: false,
              frequency: 0.05,
              opacity: 1,
            },
          },
        },
        pauseOnBlur: true,
        themes: [],
      }}
    />
  );
};

export default DustParticles;
