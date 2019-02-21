package info.doushen.ent.video.mapper;

import info.doushen.common.utils.Query;
import info.doushen.ent.video.entity.MovieEntity;

import java.util.List;

/**
 * MovieMapper
 *
 * @Author: huangdou
 * @Date: 2019-02-19
 */
public interface MovieMapper {

    /**
     * 根据条件获取电影记录数
     *
     * @param query
     * @return
     */
    int count(Query query);

    /**
     * 根据条件获取电影记录
     *
     * @param query
     * @return
     */
    List<MovieEntity> list(Query query);

    /**
     * 保存电影信息
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
