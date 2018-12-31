package info.doushen.system.mapper;

import info.doushen.common.utils.Query;
import info.doushen.system.entity.DictEntity;

import java.util.List;

/**
 * DictMapper
 *
 * @author huangdou
 * @date 2018/12/12
 */
public interface DictMapper {

    /**
     * 获取字典类型列表
     *
     * @return
     */
    List<DictEntity> listType();

    /**
     * 获取数据字典记录数
     *
     * @param query
     * @return
     */
    int count(Query query);

    /**
     * 获取数据字典记录
     *
     * @param query
     * @return
     */
    List<DictEntity> list(Query query);

    /**
     * 保存数据字典
     *
     * @param dict
     * @return
     */
    int save(DictEntity dict);

    /**
     * 获取字典信息
     *
     * @param id
     * @return
     */
    DictEntity get(int id);

    /**
     * 删除数据字典
     *
     * @param id
     * @return
     */
    int remove(int id);

    /**
     * 更新数据字典
     *
     * @param dict
     * @return
     */
    int update(DictEntity dict);

    /**
     * 根据字典类型获取数据字典
     *
     * @param dictType
     * @return
     */
    List<DictEntity> queryDictByType(String dictType);

}
