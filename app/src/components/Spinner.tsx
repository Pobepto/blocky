import React from "react";
import styled from "@emotion/styled";

export const Spinner: React.FC = () => {
  return (
    <Container>
      <ChainCore>
        <SpinnerAnimation />
      </ChainCore>
    </Container>
  );
};

export const SmallSpinner: React.FC = () => {
  return <SpinnerAnimation />;
};

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const ChainCore = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 5px solid #fff;
  background-color: transparent;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpinnerAnimation = styled.div`
  position: relative;
  top: 8px;
  left: -9999px;
  width: 10px;
  height: 10px;
  background-color: #fff;
  color: #fff;
  box-shadow: 9991px -16px 0 0 #fff, 9991px 0 0 0 #fff, 10007px 0 0 0 #fff;
  animation: dotBricks 3s infinite ease;

  @keyframes dotBricks {
    0% {
      box-shadow: 9991px -16px 0 0 #ff424b, 9991px 0 0 0 #ff424b,
        10007px 0 0 0 #ff424b;
    }
    8.333% {
      box-shadow: 10007px -16px 0 0 #00b579, 9991px 0 0 0 #00b579,
        10007px 0 0 0 #00b579;
    }
    16.667% {
      box-shadow: 10007px -16px 0 0 #ffa144, 9991px -16px 0 0 #ffa144,
        10007px 0 0 0 #ffa144;
    }
    25% {
      box-shadow: 10007px -16px 0 0 #f6e600, 9991px -16px 0 0 #f6e600,
        9991px 0 0 0 #f6e600;
    }
    33.333% {
      box-shadow: 10007px 0 0 0 #00b7d8, 9991px -16px 0 0 #00b7d8,
        9991px 0 0 0 #00b7d8;
    }
    41.667% {
      box-shadow: 10007px 0 0 0 #ff424b, 10007px -16px 0 0 #ff424b,
        9991px 0 0 0 #ff424b;
    }
    50% {
      box-shadow: 10007px 0 0 0 #00b579, 10007px -16px 0 0 #00b579,
        9991px -16px 0 0 #00b579;
    }
    58.333% {
      box-shadow: 9991px 0 0 0 #ffa144, 10007px -16px 0 0 #ffa144,
        9991px -16px 0 0 #ffa144;
    }
    66.666% {
      box-shadow: 9991px 0 0 0 #f6e600, 10007px 0 0 0 #f6e600,
        9991px -16px 0 0 #f6e600;
    }
    75% {
      box-shadow: 9991px 0 0 0 #00b7d8, 10007px 0 0 0 #00b7d8,
        10007px -16px 0 0 #00b7d8;
    }
    83.333% {
      box-shadow: 9991px -16px 0 0 #ff424b, 10007px 0 0 0 #ff424b,
        10007px -16px 0 0 #ff424b;
    }
    91.667% {
      box-shadow: 9991px -16px 0 0 #00b579, 9991px 0 0 0 #00b579,
        10007px -16px 0 0 #00b579;
    }
    100% {
      box-shadow: 9991px -16px 0 0 #ffa144, 9991px 0 0 0 #ffa144,
        10007px 0 0 0 #ffa144;
    }
  }
`;
