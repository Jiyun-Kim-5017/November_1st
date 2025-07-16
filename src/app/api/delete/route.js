import { supabase } from '@/util/supabaseClient';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function DELETE(request) {
    const body = await request.json();
    const { id, password } = body;

    if (!id || !password) {
        return NextResponse.json({ error: 'id와 비밀번호가 필요합니다.' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from("Visitor's Message")
        .select('id, password')
        .eq('id', id)
        .single();

    if (error || !data) {
        return NextResponse.json({ error: '해당 메시지를 찾을 수 없습니다.' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch) {
        return NextResponse.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 401 });
    }

    const { error: deleteError } = await supabase
        .from("Visitor's Message")
        .delete()
        .eq('id', id);

    if (deleteError) {
        return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
}
