package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QCounselor is a Querydsl query type for Counselor
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QCounselor extends EntityPathBase<Counselor> {

    private static final long serialVersionUID = 1723319638L;

    public static final QCounselor counselor = new QCounselor("counselor");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final NumberPath<Integer> career = createNumber("career", Integer.class);

    public final NumberPath<Integer> consultNumber = createNumber("consultNumber", Integer.class);

    public final StringPath consultTarget = createString("consultTarget");

    public final TimePath<java.time.LocalTime> contactEndTime = createTime("contactEndTime", java.time.LocalTime.class);

    public final TimePath<java.time.LocalTime> contactStartTime = createTime("contactStartTime", java.time.LocalTime.class);

    public final StringPath counselorId = createString("counselorId");

    public final StringPath holiday = createString("holiday");

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath longIntroduction = createString("longIntroduction");

    public final StringPath name = createString("name");

    public final StringPath password = createString("password");

    public final StringPath phoneNumber = createString("phoneNumber");

    public final NumberPath<Integer> price = createNumber("price", Integer.class);

    public final StringPath profile = createString("profile");

    public final TimePath<java.time.LocalTime> reserveEndTime = createTime("reserveEndTime", java.time.LocalTime.class);

    public final TimePath<java.time.LocalTime> reserveStartTime = createTime("reserveStartTime", java.time.LocalTime.class);

    public final StringPath shortIntroduction = createString("shortIntroduction");

    public QCounselor(String variable) {
        super(Counselor.class, forVariable(variable));
    }

    public QCounselor(Path<? extends Counselor> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCounselor(PathMetadata metadata) {
        super(Counselor.class, metadata);
    }

}

