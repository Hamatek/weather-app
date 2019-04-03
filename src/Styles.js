import styled from '@emotion/styled';

export const Input = styled.input`
  border: 0;
  border-bottom: 2px solid #1976d2;
  width: 100%;
  font-size: 2em;
  line-height: 35px;
  height: 10%;
  text-align: center;
  padding: 10px;
  background: transparent;
  color: #bbdefb;
  font-family: 'Sigmar One', cursive;
  margin: 1em 0;
`;

export const CityCard = styled.div`
  background: ${props =>
    props.cityImage
      ? `url(${props.cityImage}) no-repeat center / cover`
      : 'linear-gradient(to right, #dc2424, #4a569d)'};
`;

export const CityOverlay = styled.div`
  background: linear-gradient(to right, #607d8b, #4a569d00);
  padding: 1em;
  display: grid;
  @media (min-width: 420px) {
    grid-template-columns: 70% 1fr;
    &:hover {
      background: linear-gradient(to right, #607d8b, #ff00006b);
      .delete-card {
        display: flex;
        align-items: center;
      }
    }
  }
`;

export const CityHeader = styled.div`
  font-family: 'Sigmar One', cursive;
  font-size: 1.2em;
  padding: 2px;
`;

export const CityList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 45%);
  gap: 10px;
  @media (min-width: 900px) {
    grid-template-columns: repeat(4, 20%);
  }
`;

export const DeleteCard = styled.div`
  display: none;
  color: black;
  font-weight: bold;
  font-size: 12px;
  cursor: pointer;
`;

export const WeatherIcon = styled.img`
  width: 30;
  height: 30;
`;
