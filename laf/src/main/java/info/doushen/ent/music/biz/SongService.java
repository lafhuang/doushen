package info.doushen.ent.music.biz;

import com.github.pagehelper.PageInfo;
import info.doushen.common.utils.Pager;
import info.doushen.common.utils.Query;
import info.doushen.ent.music.entity.SongEntity;
import info.doushen.ent.music.vo.SongVO;

import java.util.List;

/**
 * SongService
 *
 * @author huangdou
 * @date 2019/1/1
 */
public interface SongService {

    /**
     * 分页获取歌曲列表
     *
     * @param query
     * @return
     */
    PageInfo<SongVO> pageSongList(Query query);

    /**
     * 保存歌曲
     *
     * @param song
     * @return
     */
    int save(SongEntity song);

    /**
     * 获取歌曲信息
     *
     * @param id
     * @return
     */
    SongVO get(int id);

    /**
     * 更新歌曲信息
     *
     * @param song
     * @return
     */
    int update(SongEntity song);

    /**
     * 导入歌手歌曲
     *
     * @param userId
     * @param songList
     * @return
     */
    int saveSingerSong(int userId, List<SongVO> songList);

    /**
     * 删除专辑歌曲
     *
     * @param albumId
     * @return
     */
    int removeByAlbum(int albumId);

}
