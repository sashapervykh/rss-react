import type { SearchResultType } from '../../api/getDataFromApi';
import { Card } from '../Card/Card';
import NO_IMAGE from '/no_image_available.png';
import style from './style.module.css';

interface Props {
  results?: SearchResultType[];
}

export function SearchResults(props: Props) {
  return (
    <div className={style['results-wrapper']}>
      {props.results
        ? props.results.length === 0
          ? 'Nothing was found on your request. Try to change input to get results (e.g. enter the whole word, not its part)'
          : props.results.map((element, index) => (
              <Card
                key={index}
                source={element.source ?? NO_IMAGE}
                title={element.title}
                media_type={element.media_type}
                description={element.description}
              />
            ))
        : `Enter your word and press 'Search' to start a journey!`}
    </div>
  );
}
