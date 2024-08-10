import * as s from './SelectCountryStyled.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader/PageHeader.jsx';
import { countryFlags, countries } from '../../assets/cityDatabase.js';

/*사용 방법
import { useLocation } from 'react-router-dom';
 const location = useLocation();
  const selectedCountry = location.state?.selectedCountry;
  console.log('Selected Country:', selectedCountry);
  하면 선택한 나라의 배열 넘어옴. 
  콘솔 보고 배열 생긴거 체크하며 값 넚으면 됨. 
  selectedCountry는 필요에 따라서 useState로 구현하는것도 추천
  */

const SelectCountry = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [prevURL, setPrevURL] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { url } = location.state || {};
    console.log('이전 페이지:' + url);
    setPrevURL(url);
  }, []);

  // // Set 객체를 사용하여 중복된 나라를 제거
  // const uniqueCountries = Array.from(new Set(cities.map((e) => e.country))).map(
  //   (country) => {
  //     return cities.find((e) => e.country === country);
  //   },
  // );

  const continents = countries.reduce((acc, country) => {
    const { continent } = country;
    if (!acc[continent]) {
      acc[continent] = [];
    }
    acc[continent].push(country);
    return acc;
  }, {});

  const handleCountryClick = (country) => {
    setSelectedCountry(
      selectedCountry === country.country ? null : country.country,
    );
    navigate(prevURL, { state: { selectedCountry: country.country } });
    console.log('Navigating with country:', country.country);
  };

  return (
    <s.PageLayout>
      <PageHeader pageName={'국가 선택'} />
      {Object.entries(continents).map(([continent, countries]) => (
        <s.ContinentWrapper key={continent}>
          <s.ContinentTitle>{continent}</s.ContinentTitle>
          {countries.map((country) => (
            <s.SingleCountryContainer
              key={country.id}
              onClick={() => handleCountryClick(country)}
            >
              {console.log(country.country)}
              <s.Flag>{countryFlags[country.country]}</s.Flag>
              <s.Country>{country.country}</s.Country>
            </s.SingleCountryContainer>
          ))}
        </s.ContinentWrapper>
      ))}
    </s.PageLayout>
  );
};

export default SelectCountry;
