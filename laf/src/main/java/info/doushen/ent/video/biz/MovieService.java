package info.doushen.ent.video.biz;

import info.doushen.common.utils.Pager;
import info.doushen.common.utils.Query;
import info.doushen.ent.video.entity.MovieEntity;

/**
 * MovieService
 *
 * @Author: huangdou
 * @Date: 2019-02-19
 */
public interface MovieService {

    /**
     * 分页获取电影信息
     *
     * @param query
     * @return
     */
    Pager pageMovieList(Query query);

    /**
     * 保存电影
     *
     * @param movie
     * @return
     */
    int save(MovieEntity movie);

    /**
     * 根据ID获取电影信息
     *
     * @param id
     * @return
     */
    MovieEntity get(int id);

}
