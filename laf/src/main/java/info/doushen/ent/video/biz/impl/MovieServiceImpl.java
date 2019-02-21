package info.doushen.ent.video.biz.impl;

import info.doushen.common.utils.Pager;
import info.doushen.common.utils.Query;
import info.doushen.ent.video.biz.MovieService;
import info.doushen.ent.video.entity.MovieEntity;
import info.doushen.ent.video.mapper.MovieMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * MovieServiceImpl
 *
 * @Author: huangdou
 * @Date: 2019-02-19
 */
@Service
public class MovieServiceImpl implements MovieService {

    @Autowired
    private MovieMapper movieMapper;

    @Override
    public Pager pageMovieList(Query query) {
        int count = movieMapper.count(query);
        if (count == 0) {
            return new Pager(count, new ArrayList<MovieEntity>());
        }
        List<MovieEntity> movieList = movieMapper.list(query);
        return new Pager(count, movieList);
    }

    @Override
    public int save(MovieEntity movie) {
        return movieMapper.save(movie);
    }

    @Override
    public MovieEntity get(int id) {
        return movieMapper.get(id);
    }

}
