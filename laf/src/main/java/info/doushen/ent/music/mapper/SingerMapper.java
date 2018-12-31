package info.doushen.ent.music.mapper;

import info.doushen.ent.music.entity.SingerEntity;

import java.util.List;
import java.util.Map;

/**
 * SingerMapper
 *
 * @author huangdou
 * @date 2018/12/22
 */
public interface SingerMapper {

    /**
     * 获取歌手列表
     *
     * @param params
     * @return
     */
    List<SingerEntity> list(Map<String, Object> params);

    /**
     * 保存歌手
     *
     * @param singer
     * @return
     */
    int save(SingerEntity singer);

    /**
     * 获取歌手信息
     *
     * @param singerId
     * @return
     */
    SingerEntity get(int singerId);

    /**
     * 更新歌手信息
     *
     * @param singer
     * @return
     */
    int update(SingerEntity singer);

}
